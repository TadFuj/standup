[CmdletBinding()]
param([string]$ConfigPath = "C:\dev\standup\nginx.conf")
$shim = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\nginx.exe"
& $shim -t -c $ConfigPath