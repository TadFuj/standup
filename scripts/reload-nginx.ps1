[CmdletBinding()]
param(
	[string]$ConfigPath = ".\nginx.conf",
	[int]$Port
)

$ErrorActionPreference = 'Stop'
$shim = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\nginx.exe"
if (-not (Test-Path $shim)) { Write-Error "NGINX shim not found at $shim"; exit 1 }

$workspace = Split-Path -Path (Resolve-Path -Path $ConfigPath).Path -Parent
$tempDir = Join-Path $workspace "temp"

if ($Port) {
	$conf = Join-Path $tempDir "standup-nginx-$Port.conf"
} else {
	try {
		$conf = Get-ChildItem -Path $tempDir -Filter "standup-nginx-*.conf" -File -ErrorAction SilentlyContinue |
			Sort-Object LastWriteTime -Descending |
			Select-Object -First 1 |
			ForEach-Object { $_.FullName }
	} catch { $conf = $null }
}

if ($conf -and (Test-Path $conf)) {
	& $shim -p $workspace -s reload -c $conf
	Write-Output "Reloaded NGINX (config: $conf, prefix: $workspace)"
} else {
	& $shim -p $workspace -s reload
	Write-Output "Reloaded NGINX (prefix: $workspace)"
}