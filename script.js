let canvas;
let context;
let doAnimate = true;
setUpContext();

formatTextAreaPlaceholders();

let startScreenElement = document.getElementById('start-screen');
let gameplayScreenElement = document.getElementById('gameplay-screen');
let playersInputElement = document.getElementById('ta-players');
let finalBossesInputElement = document.getElementById('ta-bosses');
let playerForm = document.getElementById('player-form');
let selectMenu = document.getElementById('theme-select');
let matrixBackground = document.getElementById('matrix-background');
let isShowingHints = false;

let players = new Players();
let game;
let resetReady = false;
let props = new Properties();

playerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  startGame();
});

selectMenu.addEventListener('change', function () {
  if (selectMenu.value == 'matrix-theme') {
    doAnimateMatrix = true;
    startTheMatrix();
    animateMatrix(0);
    matrixBackground.style.display = 'block';
  } else {
    matrixBackground.style.display = 'none';
    doAnimateMatrix = false;
  }
});

selectTheme(); // sets the theme based on the currently selected dropdown item in "theme-select"

function setUpContext() {
  canvas = document.getElementById('main-canvas');
  context = canvas.getContext('2d');
  doAnimate = true;
}

function startGame() {
  setUpContext();
  props.initTheme();
  players.loadPlayersFromText(
    playersInputElement.value,
    finalBossesInputElement.value
  );
  if (!players.hasPlayers()) {
    return;
  }
  players.randomizePlayers();
  showGameScreen();
  game = new Game(
    players.getPlayers(),
    players.getFinalBosses(),
    props,
    canvas
  );
  game.beginGame();
  animate();
}

function killGame() {
  doAnimate = false;
}

function nextPlayer() {
  game.selectCurrentPlayers();
}

function sendPlayerBack() {
  game.sendPlayerBack();
}

function addParkingLot() {
  if (!game.getPlayers()) {
    return;
  }
  if (document.getElementById('ta-parking-lots').value == '') {
    document.getElementById('ta-parking-lots').value +=
      game.getCurrentPlayerName() + ' - ';
  } else {
    document.getElementById('ta-parking-lots').value +=
      '\n' + game.getCurrentPlayerName() + ' - ';
  }
}

addEventListener('resize', () => {
  if (game) {
    game.setSize();
    game.preparePlayers();
  }
  resizeMatrix();
});

function resetGame() {
  if (resetReady) {
    showStartScreen();
    killGame();
  } else {
    resetReady = true;
    document.getElementById('reset-button').innerText = 'Confirm';
  }
}

function showStartScreen() {
  startScreenElement.style.display = 'block';
  gameplayScreenElement.style.display = 'none';
}

function showGameScreen() {
  resetReady = false;
  document.getElementById('reset-button').innerText = 'Reset';
  startScreenElement.style.display = 'none';
  gameplayScreenElement.style.display = 'block';
}

function animate() {
  if (!doAnimate) {
    context = null;
    return;
  }
  game.drawFrame();
  requestAnimationFrame(animate);
}

function selectTheme() {
  const mainBody = document.getElementById('main-body');
  if (mainBody) {
    mainBody.className = '';
    const theme = document.getElementById('theme-select')?.value;
    if (theme) {
      mainBody.classList.add(theme);
      props.initTheme();
    }
  }
}

function showHideDescription() {
  if (isShowingHints) {
    document.getElementById('hint-content').style.display = 'none';
    document.getElementById('hint-button').innerText = 'Show Description';
    isShowingHints = false;
  } else {
    isShowingHints = true;
    document.getElementById('hint-content').style.display = 'block';
    document.getElementById('hint-button').innerText = 'Hide Description';
  }
}
