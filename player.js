/*
Player: Object that stores the name of a player
and can draw itself in a given position
params:
    name: string

functions:
    draw(x, y, scale)
    x = x postion
    y = y postion
    scale = 0 < scale < 1 multiplier for size
*/
class Player {
  constructor(name, x, y, props, playerCanvas) {
    this.props = props;
    this.name = name;
    this.canvas = playerCanvas;
    this.x = x;
    this.y = y;
    this.setRandomPosition();
    this.color = generateColor();
    this.font = this.props.textPlayer;
    this.setRandomSpeeds();
    this.isCurrentPlayer = false;
    this.isNextPlayer = false;
  }

  getCssSize() {
    const dpr = window.devicePixelRatio || 1;
    const cssW = this.canvas.clientWidth || Math.floor(this.canvas.width / dpr);
    const cssH =
      this.canvas.clientHeight || Math.floor(this.canvas.height / dpr);
    return { cssW, cssH };
  }

  getName() {
    return this.name;
  }

  getHeight() {
    // lower number = higher on screen
    return this.y;
  }

  resetPlayer() {
    const { cssW, cssH } = this.getCssSize();
    this.x = cssW / 2;
    this.y = cssH - 20; // near bottom
    this.color = this.props.colorOfShame;
    this.font = this.props.textPlayer;
    this.setRandomSpeeds();
    this.isCurrentPlayer = false;
    this.isNextPlayer = false;
  }

  setSpeed(speedX, speedY) {
    this.speedX = speedX;
    this.speedY = speedY;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setIsCurrentPlayer() {
    this.font = this.props.textCurrentPlayer;
    this.color = this.props.heroTextColor;
    this.isCurrentPlayer = true;
    this.isNextPlayer = false;
  }

  setIsNextPlayer() {
    this.font = this.props.textNextPlayer;
    this.isCurrentPlayer = false;
    this.isNextPlayer = true;
  }

  drawPlayer() {
    this.calculatePosition();
    this.drawText();
  }

  drawAsCurrentPlayer() {
    context.beginPath();
    context.textAlign = 'center';
    context.fillStyle = this.color;
    context.font = this.font;
    const { cssW } = this.getCssSize();
    context.fillText(this.name, cssW / 2, 40);
  }

  drawText() {
    context.beginPath();
    context.font = this.font;
    context.textAlign = 'center';
    context.fillStyle = this.color;
    context.fillText(this.name, this.x, this.y);
  }

  calculatePosition() {
    const { cssW, cssH } = this.getCssSize();
    if (this.x > cssW || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > cssH || this.y < cssH * 0.4) {
      this.speedY *= -1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    if (!this.isCurrentPlayer && !this.isNextPlayer) {
      this.bringMeHome();
    }
  }

  bringMeHome() {
    const { cssW, cssH } = this.getCssSize();
    if (
      this.x > cssW + 2 ||
      this.x < -2 ||
      this.y > cssH + 2 ||
      this.y < cssH * 0.3999
    ) {
      this.x = cssW / 2;
      this.y = cssH / 2;
    }
  }

  setRandomSpeeds() {
    this.speedX = (Math.random() - 0.5) * this.props.playerSpeedModifier;
    this.speedY = (Math.random() - 0.5) * this.props.playerSpeedModifier;
  }

  setRandomPosition() {
    const { cssW, cssH } = this.getCssSize();
    this.x = cssW * Math.random();
    this.y = cssH * 0.6 * Math.random() + cssH * 0.4;
  }
}
