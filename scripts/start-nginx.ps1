[CmdletBinding()]
param(
    [int]$Port = 8080,
    [string]$ConfigPath = ".\nginx.conf"
)

$shim = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\nginx.exe"
if (-not (Test-Path $shim)) {
    Write-Error "NGINX shim not found at $shim"; exit 1
}

# Resolve config full path and workspace
try {
    $configFullPath = (Resolve-Path -Path $ConfigPath -ErrorAction Stop).Path
} catch {
    Write-Error "Config file not found: $ConfigPath"; exit 1
}
$workspace = Split-Path -Path $configFullPath -Parent

# Ensure required directories exist (relative paths in nginx.conf resolve under prefix)
$dirs = @(
    (Join-Path $workspace "logs"),
    (Join-Path $workspace "temp\client_body_temp"),
    (Join-Path $workspace "temp\proxy_temp"),
    (Join-Path $workspace "temp\fastcgi_temp"),
    (Join-Path $workspace "temp\scgi_temp"),
    (Join-Path $workspace "temp\uwsgi_temp")
)
foreach ($d in $dirs) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null } }

# Create a temp config under gitignored temp directory with the requested port
$tmpDir = Join-Path $workspace "temp"
if (-not (Test-Path $tmpDir)) { New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null }
$tmp = Join-Path $tmpDir "standup-nginx-$Port.conf"
try {
    $content = Get-Content -Raw $configFullPath -ErrorAction Stop
} catch {
    Write-Error "Failed to read config: $configFullPath"; exit 1
}
$updated = $content -replace '(?mi)^\s*listen\s+\d+\s*;', "        listen $Port;"

# Write UTF-8 without BOM to avoid potential parsing issues
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($tmp, $updated, $utf8NoBom)

if (-not (Test-Path $tmp)) { Write-Error "Temp config not created: $tmp"; exit 1 }

# Start or reload NGINX with explicit prefix so relative paths resolve to workspace
$nginxProcs = Get-Process -Name nginx -ErrorAction SilentlyContinue
if ($nginxProcs) {
    & $shim -p $workspace -s reload -c $tmp
    $code = $LASTEXITCODE
    if ($code -ne 0) {
        Write-Warning "Reload failed (exit $code); attempting fresh start"
        & $shim -p $workspace -c $tmp
        $code = $LASTEXITCODE
        if ($code -ne 0) { Write-Error "NGINX start failed (exit $code) using $tmp"; exit $code }
        Write-Output "Started NGINX with port $Port (config: $tmp, prefix: $workspace)"
    } else {
        Write-Output "Reloaded NGINX with port $Port (config: $tmp, prefix: $workspace)"
    }
} else {
    & $shim -p $workspace -c $tmp
    $code = $LASTEXITCODE
    if ($code -ne 0) { Write-Error "NGINX start failed (exit $code) using $tmp"; exit $code }
    Write-Output "Started NGINX with port $Port (config: $tmp, prefix: $workspace)"
}

Write-Output "Open http://localhost:$Port"