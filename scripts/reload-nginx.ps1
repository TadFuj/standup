[CmdletBinding()]
param([string]$ConfigPath = "C:\dev\standup\nginx.conf")
$shim = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\nginx.exe"
& $shim -s reload -c $ConfigPath
Write-Output "Reloaded NGINX with config: $ConfigPath"