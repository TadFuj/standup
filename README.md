# Standup Assistant
Use this web utility to choose team members randomly for providing updates during a daily standup, roundtable discussion, icebreaker, or whatever else is applicable.

### Players
  - All people listed in the players section will be randomized and one by one will be selected to give their update.
  - List each player on their own line in the input text area.

### Final Round
  - Anyone placed in the final round section will not be on deck until all the players have gone.
  - This is ususally a good place for managers and directors, or anyone you want to go last.

### Gameplay
  - The list of players is randomized and placed around the play zone.
  - All players will bounce around in the play zone.
  - Two players are selected right at the start.
  - The player shown in blue at the top is the player that is on deck! Time to give your update!
  - The player shown below the current player is going to be up next.

### Next Player
  - The current player will be removed from the round
  - The player in the 'up-next' position is moved to the Hero position to give their update.
  - Selects the person at the very top of the play zone screen to be added to the 'up next' position.

### Parking lot items (+PL)
  - Add anyting you want to discuss further after the round is complete.
  - If you click +PL the current player's name will be added to the parking lot area.

### Reset
  - Takes you back to the startup page and maintains the previous game setup. 
  - Note!! This will fully reset the game in-progress and re-randomize all players.

### Send Back
  - Places the current player on deck at the bottom of the play screen. (Useful for people running late)
  - This does not change the order of final bosses unless they are already in the play zone.

### Credit
Many mahalos to [Mr. Will Jenkins](https://github.com/WillJenkins) for his initial creation of this app.

## Local Server (NGINX)

The app can be served locally via NGINX on Windows.

- Start: `& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\nginx.exe" -c C:\dev\standup\nginx.conf`
- Reload: `& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\nginx.exe" -s reload -c C:\dev\standup\nginx.conf`
- Test config: `& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\nginx.exe" -t -c C:\dev\standup\nginx.conf`
- Stop: `& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\nginx.exe" -s stop`

Open http://localhost:8080 after starting.

### Change Port
Edit the `listen` directive in [nginx.conf](nginx.conf) to your preferred port, then reload:

```
server {
  listen 3000;
  server_name localhost;
  root C:/dev/standup;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

### Notes
- Logs and temp directories live under [logs/](logs) and [temp/](temp).
- If `nginx` isn’t on PATH, the WinGet shim path above works without restarting PowerShell.

## Helper Scripts

Located in [scripts/](scripts):
- Start with optional port: `./scripts/start-nginx.ps1 -Port 8080`
- Reload: `./scripts/reload-nginx.ps1`
- Stop: `./scripts/stop-nginx.ps1`
- Test config: `./scripts/test-nginx.ps1`
- Open in browser: `./scripts/open.ps1 -Port 8080`

If your execution policy blocks scripts, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
