const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');

let score = 0;
let currentMole = null;
let gameTime = 30;
let moleTimer;
let gameTimer;

function randomHole() {
  return Math.floor(Math.random() * holes.length);
}

function showMole() {
  if (currentMole !== null) {
    holes[currentMole].innerHTML = '';
  }

  const index = randomHole();
  const mole = document.createElement('div');
  mole.classList.add('mole');
  mole.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    mole.remove();
    currentMole = null;
  });

  holes[index].appendChild(mole);
  currentMole = index;
}

function startGame() {
  score = 0;
  gameTime = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = gameTime;
  startBtn.disabled = true;

  moleTimer = setInterval(showMole, 800);

  gameTimer = setInterval(() => {
    gameTime--;
    timeDisplay.textContent = gameTime;

    if (gameTime <= 0) {
      clearInterval(gameTimer);
      clearInterval(moleTimer);
      if (currentMole !== null) holes[currentMole].innerHTML = '';
      alert('Waktu Habis! Skor Anda: ' + score);
      startBtn.disabled = false;
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
