let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;

const h2 = document.getElementById("statusText");
const highScoreDisplay = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");

let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.innerText = `🏆 High Score: ${highScore}`;

document.addEventListener("keypress", startGame);
startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = "Watch the pattern...";
    startBtn.style.display = "none";
    retryBtn.style.display = "none";
    levelUp();
  }
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level} - Your turn`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.getElementById(randColor);
  gameSeq.push(randColor);

  setTimeout(() => btnFlash(randBtn), 600);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      h2.innerText = "Correct! Watch next sequence...";
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `❌ Game Over! Your score was <b>${level}</b>`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 150);
    updateHighScore();
    retryBtn.style.display = "inline-block";
    started = false;
  }
}

function btnPress() {
  if (!started) return;
  let btn = this;
  userFlash(btn);
  let userColor = btn.id;
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.innerText = `🏆 High Score: ${highScore}`;
    highScoreDisplay.classList.add("highlight");
    setTimeout(() => highScoreDisplay.classList.remove("highlight"), 600);
  }
}


// Modal Logic
const modal = document.getElementById("howToPlayModal");
const howToPlayBtn = document.getElementById("howToPlayBtn");
const closeBtn = document.querySelector(".modal .close");

howToPlayBtn.onclick = function () {
  modal.style.display = "block";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
