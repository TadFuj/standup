let matrixCanvas;
let ctx;
startTheMatrix();

function startTheMatrix() {
  matrixCanvas = document.getElementById('matrix-canvas');
  ctx = matrixCanvas.getContext('2d');
  matrixCanvas.width = document.body.scrollWidth;
  matrixCanvas.height = document.body.scrollWidth;
}

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }

  draw(pContext) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    pContext.fillText(
      this.text,
      this.x * this.fontSize,
      this.y * this.fontSize
    );
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class SymbolStreak {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25; //make this prop?
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  reset(canvasWidth, canvasHeight) {
    this.symbols = [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.columns = this.canvasWidth / this.fontSize;
    this.#initialize();
  }
}

const symbolStreak = new SymbolStreak(matrixCanvas.width, matrixCanvas.height);

let lastTimeMatrix = 0;
const fpsMatrix = 20;
const nextFrameMatrix = 1000 / fpsMatrix;
let timerMatrix = 0;
let doAnimateMatrix = true;

function animateMatrix(timeStamp) {
  if (!doAnimateMatrix) {
    ctx = null;
    return;
  }
  const deltaT = timeStamp - lastTimeMatrix;
  lastTimeMatrix = timeStamp;
  if (timerMatrix > nextFrameMatrix) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, matrixCanvas.clientWidth, matrixCanvas.height);
    ctx.fillStyle = '#9aff0a'; //text color -- make this a prop
    ctx.font = symbolStreak.fontSize + 'px monospace';
    symbolStreak.symbols.forEach((symbol) => symbol.draw(ctx));
    timerMatrix = 0;
  } else {
    timerMatrix += deltaT;
  }
  requestAnimationFrame(animateMatrix);
}

function resizeMatrix() {
  matrixCanvas.width = document.body.scrollWidth;
  matrixCanvas.height = document.body.scrollHeight;
  if (symbolStreak) {
    symbolStreak.reset(matrixCanvas.width, matrixCanvas.height);
  }
}
