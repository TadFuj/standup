$shim = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\nginx.exe"
& $shim -s stop
Write-Output "Stopped NGINX"