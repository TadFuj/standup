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

initThemeSelection(); // initialize theme from last saved selection
initTextPersistence(); // load and persist textarea content

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
  const htmlEl = document.documentElement;
  const select = document.getElementById('theme-select');
  if (!select) return;
  const theme = select.value;


  // Reset html data-theme and body theme classes
  htmlEl.removeAttribute('data-theme');
  if (mainBody) mainBody.className = '';

  // Apply light/dark via data-theme for brand.css
  if (theme === 'light' || theme === 'dark') {
    htmlEl.setAttribute('data-theme', theme);
  }

  // Apply app-specific themes via body class
  if (mainBody && theme && theme !== 'light' && theme !== 'dark') {
    mainBody.classList.add(theme);
  }

  // Toggle Matrix background when matrix theme is active
  if (typeof doAnimateMatrix !== 'undefined') {
    if (theme === 'matrix-theme') {
      doAnimateMatrix = true;
      if (typeof startTheMatrix === 'function') startTheMatrix();
      if (typeof animateMatrix === 'function') animateMatrix(0);
      if (matrixBackground) matrixBackground.style.display = 'block';
    } else {
      if (matrixBackground) matrixBackground.style.display = 'none';
      doAnimateMatrix = false;
    }
  }

  // Persist selection
  try {
    if (theme) {
      localStorage.setItem('standup.theme', theme);
    } else {
      localStorage.removeItem('standup.theme');
    }
  } catch {}

  // Re-init theme derived properties
  props.initTheme();
}

function initThemeSelection() {
  const select = document.getElementById('theme-select');
  if (!select) return;
  try {
    const saved = localStorage.getItem('standup.theme');
    if (saved) {
      const hasOption = Array.from(select.options).some((o) => o.value === saved);
      if (hasOption) select.value = saved;
    }
  } catch {}
  // Apply the selected or default theme
  selectTheme();
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

function initTextPersistence() {
  try {
    const savedPlayers = localStorage.getItem('standup.playersText');
    const savedBosses = localStorage.getItem('standup.bossesText');
    if (playersInputElement && savedPlayers && savedPlayers.length > 0) {
      playersInputElement.value = savedPlayers;
    }
    if (finalBossesInputElement && savedBosses && savedBosses.length > 0) {
      finalBossesInputElement.value = savedBosses;
    }
  } catch {}

  if (playersInputElement) {
    playersInputElement.addEventListener('input', () => {
      try {
        localStorage.setItem('standup.playersText', playersInputElement.value || '');
      } catch {}
    });
  }
  if (finalBossesInputElement) {
    finalBossesInputElement.addEventListener('input', () => {
      try {
        localStorage.setItem('standup.bossesText', finalBossesInputElement.value || '');
      } catch {}
    });
  }
}
