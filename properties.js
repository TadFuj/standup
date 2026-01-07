class Properties {
  mainTextColor = '#2c67b5';
  heroTextColor = 'rgb(50,255,255)';
  sidekickTextColor = 'rgb(200, 60, 60)';
  accent = 'none';
  colorOfShame = 'rgb(255, 90, 90)';
  canvasBorderColor = 'rgb(255, 90, 90)';

  // world
  globalBackgroundColor = 'rgba(0, 0, 24, 0.2)';

  // text props
  textMainFont =
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--font-family1') || 'AS Circular';
  textHeaderSize = 36;
  textPlayer = `24px ${this.textMainFont}`;
  textCurrentPlayer = `36px ${this.textMainFont}`;
  textNextPlayer = `24px ${this.textMainFont}`;

  // animation
  playerSpeedModifier = 0.15;

  initTheme() {
    let sourceElement = document.getElementById('main-text');
    this.mainTextColor = window.getComputedStyle(sourceElement).color;
    this.globalBackgroundColor =
      window.getComputedStyle(sourceElement).backgroundColor;

    sourceElement = document.getElementById('canvas-border');
    this.canvasBorderColor = window.getComputedStyle(sourceElement).color;

    sourceElement = document.getElementById('hero-text');
    this.heroTextColor = window.getComputedStyle(sourceElement).color;

    sourceElement = document.getElementById('color-of-shame');
    this.colorOfShame = window.getComputedStyle(sourceElement).color;
  }
}
