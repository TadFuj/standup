[CmdletBinding()]
param(
	[ValidateSet('quit','stop')]
	[string]$Signal = 'quit'
)

$ErrorActionPreference = 'Stop'

$shim = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\nginx.exe"
if (-not (Test-Path $shim)) {
	Write-Error "NGINX shim not found at $shim"; exit 1
}

# Workspace is the repo root (parent of this scripts directory)
$workspace = Split-Path -Path $PSScriptRoot -Parent
$tempDir = Join-Path $workspace "temp"

# Helper: get latest generated temp config if present
function Get-LatestTempConfig {
	param([string]$dir)
	try {
		$cfg = Get-ChildItem -Path $dir -Filter "standup-nginx-*.conf" -File -ErrorAction SilentlyContinue |
			Sort-Object LastWriteTime -Descending |
			Select-Object -First 1
		if ($cfg) { return $cfg.FullName }
	} catch {}
	return $null
}

if ($Signal -eq 'quit') {
	# Graceful: try nginx signal first, then PID kill
	$conf = Get-LatestTempConfig -dir $tempDir
	if ($conf) {
		& $shim -p $workspace -c $conf -s quit
	} else {
		& $shim -p $workspace -s quit
	}
	$code = $LASTEXITCODE
	if ($code -eq 0) { Write-Output "Stopped NGINX (quit)"; exit 0 }

	# fallback to PID-based stop
	$pidFile = Join-Path $workspace "logs/nginx.pid"
	if (Test-Path $pidFile) {
		try {
			$nginxPid = Get-Content -Raw $pidFile | ForEach-Object { $_.Trim() } | Select-Object -First 1
			if ($nginxPid -and ($nginxPid -as [int])) {
				Stop-Process -Id ([int]$nginxPid) -Force -ErrorAction Stop
				Write-Output "Stopped NGINX (PID $nginxPid)"
				exit 0
			}
		} catch {
			Write-Warning "PID-based stop failed: $($_.Exception.Message)"
		}
	}
} else {
	# Immediate: try PID-based termination first
	$pidFile = Join-Path $workspace "logs/nginx.pid"
	if (Test-Path $pidFile) {
		try {
			$nginxPid = Get-Content -Raw $pidFile | ForEach-Object { $_.Trim() } | Select-Object -First 1
			if ($nginxPid -and ($nginxPid -as [int])) {
				Stop-Process -Id ([int]$nginxPid) -Force -ErrorAction Stop
				Write-Output "Stopped NGINX (PID $nginxPid)"
				exit 0
			}
		} catch {
			Write-Warning "PID-based stop failed: $($_.Exception.Message)"
		}
	}

	# fallback to nginx signal stop
	$conf = Get-LatestTempConfig -dir $tempDir
	if ($conf) {
		& $shim -p $workspace -c $conf -s stop
	} else {
		& $shim -p $workspace -s stop
	}
	$code = $LASTEXITCODE
	if ($code -eq 0) { Write-Output "Stopped NGINX (stop)"; exit 0 }
}

# Last resort: kill any running nginx processes
try {
	$procs = Get-Process -Name nginx -ErrorAction SilentlyContinue
	if ($procs) {
		$procs | Stop-Process -Force -ErrorAction Stop
		Write-Output "Stopped NGINX (killed running processes)"
		exit 0
	}
} catch {
	Write-Warning "Process kill failed: $($_.Exception.Message)"
}

Write-Error "Failed to stop NGINX"
exit 1