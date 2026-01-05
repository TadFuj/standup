class Players {
  constructor() {
    this.players = [];
    this.finalBosses = [];
  }

  loadPlayersFromText(playerText, finalBossesText) {
    this.clearAllPlayers();
    // console.log('loading player text: ' + playerText);
    if (playerText) {
      this.players = playerText.split('\n').filter(function (e) {
        return e != '';
      });
      this.finalBosses = finalBossesText.split('\n').filter(function (e) {
        return e != '';
      });
      //this.randomizePlayers();
    }
  }

  clearAllPlayers() {
    this.players = [];
    this.finalBosses = [];
  }

  getFinalBosses() {
    return this.finalBosses;
  }

  randomizePlayers() {
    this.players.sort((a, b) => 0.5 - Math.random());
  }

  getPlayers() {
    return this.players;
  }

  getAllPlayers() {
    return this.players + this.finalBosses;
  }

  hasPlayers() {
    console.log('has players: ' + this.players);
    return this.players.length > 0;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  addFinalBoss(boss) {
    this.finalBosses.push(boss);
  }
}
