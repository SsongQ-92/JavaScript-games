const images = [
  'cheetah.jpg',
  'duck.jpg',
  'elephant.jpg',
  'kitty.jpg',
  'monkey.jpg',
  'racoon.jpg',
  'sheep.jpg',
  'zebra.jpg',
  'cheetah.jpg',
  'duck.jpg',
  'elephant.jpg',
  'kitty.jpg',
  'monkey.jpg',
  'racoon.jpg',
  'sheep.jpg',
  'zebra.jpg',
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const $board = document.getElementById('board');
const $timeElement = document.getElementById('timer');
const $startBtn = document.getElementById('$startBtn');
let timeLeft = 100;
let timer;

// Shuffle images
images.sort(() => 0.5 - Math.random());

// flipCard Func
const flipCard = function () {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
};

// checkForMatch Func
const checkForMatch = function () {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === images.length / 2) {
      clearInterval(timer);
      alert('성공!');
    }
  } else {
    unFlipCards();
  }
};

// disableCard Func
const disableCards = function () {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
};

// resetBoard Func
const resetBoard = function () {
  [firstCard, secondCard, lockBoard] = [null, null, false];
};

// unFlipCards Func
const unFlipCards = function () {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 800);
};

const startTimer = function () {
  timer = setInterval(() => {
    timeLeft--;
    $timeElement.textContent = `${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert('시간 초과!');
    }
  }, 1000);
};

// Create Cards
$startBtn.addEventListener('click', () => {
  images.forEach(image => {
    const $card = document.createElement('div');
    $card.classList.add('card');
    $card.dataset.image = image;
    $card.innerHTML = `<img src="assets/images/${image}" alt="카드 이미지" />`;
    $card.addEventListener('click', flipCard);
    $board.appendChild($card);
  });
});
