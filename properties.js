class Properties {
  // text decoration
  mainTextColor = 'rgb(255, 90, 90)';
  mainTextShadowColor = 'rgb(255, 0 ,0)';
  mainTextBlur = 'blur(8px)';
  heroTextColor = 'rgb(50,255,255)';
  heroShadowColor = 'rgba(10, 155, 155, 1)';
  heroTextBlur = 'blur(8px)';
  sidekickTextColor = 'rgb(200, 60, 60';
  sidekickShadowColor = 'rgb(150, 10, 10)';
  sidekickTextBlur = 'blur(8px)';
  accent = 'rgb(50,255,255)';
  playerShadowColor = 'rgb(50, 0, 130)';
  colorOfShame = 'rgb(255, 90, 90)';
  colorOfShameShadow = 'rgb(255, 0 ,0)';
  canvasBorderColor = 'rgb(255, 90, 90)';

  // world
  globalBackgroundColor = 'rgba(0, 0, 24, 0.2)';

  // text props
  textMainFont = 'Consolas';
  textHeaderSize = 40;
  textPlayer = '30px Courier New';
  textCurrentPlayer = '50px Courier New';
  textNextPlayer = '25px Courier New';

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
