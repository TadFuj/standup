class Properties {
  // text decoration
  mainTextColor = '#2c67b5';
  mainTextShadowColor = 'none';
  mainTextBlur = 'blur(8px)';
  heroTextColor = 'rgb(50,255,255)';
  heroShadowColor = 'none';
  heroTextBlur = 'blur(8px)';
  sidekickTextColor = 'rgb(200, 60, 60';
  sidekickShadowColor = 'none';
  sidekickTextBlur = 'blur(8px)';
  accent = 'none';
  playerShadowColor = 'none';
  colorOfShame = 'rgb(255, 90, 90)';
  colorOfShameShadow = 'none';
  canvasBorderColor = 'rgb(255, 90, 90)';

  // world
  globalBackgroundColor = 'rgba(0, 0, 24, 0.2)';

  // text props
  textMainFont = 'AS Circular';
  textHeaderSize = 40;
  textPlayer = '30px AS Circular';
  textCurrentPlayer = '50px AS Circular';
  textNextPlayer = '25px AS Circular';

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
    this.heroShadowColor =
      window.getComputedStyle(sourceElement).backgroundColor;

    sourceElement = document.getElementById('color-of-shame');
    this.colorOfShame = window.getComputedStyle(sourceElement).color;
    this.colorOfShameShadow =
      window.getComputedStyle(sourceElement).backgroundColor;
  }
}
