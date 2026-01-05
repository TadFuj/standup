// const canvas = document.getElementById("main-canvas");
// const context = canvas.getContext("2d");

class Game {
  currentPlayer;
  nextPlayer;
  props;

  constructor(playersNames, finalBossesNames, props, mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.mainContext = mainCanvas.getContext('2d');
    this.playersNames = playersNames;
    this.finalBossesNames = finalBossesNames;
    this.setSize();
    this.players = [];
    this.props = props;
    this.setCanvasSize();
  }

  setSize() {
    this.sizeX = innerWidth * 0.8;
    this.sizeY = innerHeight / 2;
    this.setCanvasSize();
  }

  setCanvasSize() {
    this.mainCanvas.height = this.sizeY;
    this.mainCanvas.width = this.sizeX;
  }

  getCurrentPlayerName() {
    return this.currentPlayer.getName();
  }

  beginGame() {
    this.initPlayers();
    this.selectStartingPlayers();
    //this.animate();
  }

  initPlayers() {
    this.playersNames.forEach((player) => {
      this.players.push(
        new Player(
          player,
          this.sizeX / 2,
          this.sizeY / 2,
          this.props,
          this.mainCanvas
        )
      );
    });
  }

  getPlayers() {
    return this.players;
  }

  selectStartingPlayers() {
    if (this.nextPlayer) {
      this.currentPlayer = this.nextPlayer;
    } else {
      this.currentPlayer = this.players.shift();
    }
    this.nextPlayer = this.players.shift();
    this.preparePlayers();
  }

  selectCurrentPlayers() {
    if (this.nextPlayer) {
      this.currentPlayer = this.nextPlayer;
    } else {
      this.currentPlayer = this.getAndRemovePlayer(this.getHighestPlayer());
    }
    this.nextPlayer = this.getAndRemovePlayer(this.getHighestPlayer());
    this.preparePlayers();
  }

  getHighestPlayer() {
    let highest = this.players[0];
    this.players.forEach((p) => {
      if (highest.getHeight() > p.getHeight()) {
        highest = p;
      }
    });
    return highest;
  }

  getAndRemovePlayer(player) {
    let index = this.players.indexOf(player);
    if (index != -1) {
      return this.players.splice(index, 1)[0];
    }
    return null;
  }

  preparePlayers() {
    if (this.currentPlayer) {
      this.currentPlayer.setSpeed(0, 0);
      this.currentPlayer.setPosition(this.sizeX / 2, 50);
      this.currentPlayer.setIsCurrentPlayer();
    }

    if (this.nextPlayer) {
      this.nextPlayer.setSpeed(0, 0);
      this.nextPlayer.setPosition(this.sizeX / 2, 100);
      this.nextPlayer.setIsNextPlayer();
    }
  }

  sendPlayerBack() {
    this.currentPlayer.resetPlayer();
    this.players.push(this.currentPlayer);
    this.selectCurrentPlayers();
  }

  drawFrame() {
    this.drawBackground();
    this.drawBorder();
    this.drawPlayers();
    this.drawLineOfDefense();
  }

  drawBackground() {
    this.mainContext.beginPath();
    this.mainContext.fillStyle = this.props.globalBackgroundColor;
    this.mainContext.fillRect(0, 0, this.sizeX, this.sizeY);
  }

  drawPlayers() {
    this.players.forEach((player) => {
      player.drawPlayer();
    });
    if (this.currentPlayer) {
      this.currentPlayer.drawPlayer();
    }
    if (this.nextPlayer) {
      this.nextPlayer.drawPlayer();
    }
    if (this.players.length == 0) {
      this.playersNames = this.finalBossesNames;
      this.finalBossesNames = [];
      this.initPlayers();
    }
  }

  drawBorder() {
    this.mainContext.beginPath();
    this.mainContext.strokeStyle = this.props.canvasBorderColor;
    this.mainContext.lineWidth = 2;
    this.mainContext.rect(2, 2, this.sizeX - 4, this.sizeY - 4);
    this.mainContext.stroke();
  }

  drawLineOfDefense() {
    this.mainContext.beginPath();
    this.mainContext.strokeStyle = this.props.canvasBorderColor;
    this.mainContext.lineWidth = 2;
    this.mainContext.moveTo(2, this.mainCanvas.height * 0.35);
    this.mainContext.lineTo(
      this.mainCanvas.width - 2,
      this.mainCanvas.height * 0.35
    );
    this.mainContext.filter = 'blur(4px)';
    this.mainContext.stroke();
    this.mainContext.filter = 'blur(0px)';
    this.mainContext.stroke();
  }
}
