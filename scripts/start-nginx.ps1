[CmdletBinding()]
param(
    [int]$Port = 8080,
    [string]$ConfigPath = "C:\dev\standup\nginx.conf"
)

$shim = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\nginx.exe"
if (-not (Test-Path $shim)) {
    Write-Error "NGINX shim not found at $shim"; exit 1
}

# Ensure required directories exist
$workspace = Split-Path $ConfigPath -Parent
$dirs = @(
    (Join-Path $workspace "logs"),
    (Join-Path $workspace "temp\client_body_temp")
)
foreach ($d in $dirs) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null } }

# Create a temp config with the requested port
$tmp = Join-Path $env:TEMP "standup-nginx-$Port.conf"
$content = Get-Content -Raw $ConfigPath
$updated = $content -replace '(?mi)^\s*listen\s+\d+\s*;', "        listen $Port;"
Set-Content -Path $tmp -Value $updated -Encoding UTF8

# Start or reload NGINX
$nginxProcs = Get-Process -Name nginx -ErrorAction SilentlyContinue
if ($nginxProcs) {
    & $shim -s reload -c $tmp
    Write-Output "Reloaded NGINX with port $Port (config: $tmp)"
} else {
    & $shim -c $tmp
    Write-Output "Started NGINX with port $Port (config: $tmp)"
}

Write-Output "Open http://localhost:$Port"