class Players {
  constructor() {
    this.players = [];
    this.finalBosses = [];
  }

  loadPlayersFromText(playerText, finalBossesText) {
    this.clearAllPlayers();
    if (playerText) {
      this.players = playerText.split('\n').filter(function (e) {
        return e != '';
      });
      this.finalBosses = finalBossesText.split('\n').filter(function (e) {
        return e != '';
      });
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
    return this.players.length > 0;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  addFinalBoss(boss) {
    this.finalBosses.push(boss);
  }
}
