[CmdletBinding()]
param([int]$Port = 8080)
Start-Process "http://localhost:$Port"