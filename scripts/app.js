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
const $startBtn = document.getElementById('startBtn');
const $resetBtn = document.getElementById('resetBtn');
const $overlay = document.getElementById('overlay');
let timeLeft = 60;
let timer;
let isPlaying = false;

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
      // alert('성공!');
      $overlay.classList.remove('transparent');
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

// startTimer Func
const startTimer = function () {
  timer = setInterval(() => {
    timeLeft--;
    $timeElement.textContent = `${timeLeft}`;
    if (timeLeft === 0) {
      alert('시간 초과!');
      clearInterval(timer);
      timeLeft = 60;
    }
  }, 1000);
};

// Create Cards
$startBtn.addEventListener('click', () => {
  if (isPlaying) return;
  if (!$overlay.classList.contains('transparent')) $overlay.classList.add('transparent');

  // Shuffle Cards
  images.sort(() => 0.5 - Math.random());

  isPlaying = true;

  images.forEach(image => {
    const $card = document.createElement('div');
    $card.classList.add('card');
    $card.dataset.image = image;
    $card.innerHTML = `<img src="assets/images/${image}" alt="카드 이미지" />`;
    $card.addEventListener('click', flipCard);
    $board.appendChild($card);
  });

  startTimer();
});

// Reset Game
$resetBtn.addEventListener('click', () => {
  isPlaying = false;
  $board.innerHTML = '';
  matchedPairs = 0;

  clearInterval(timer);
  timeLeft = 60;
  $timeElement.textContent = '60';
});

// Remove Overlay
$overlay.addEventListener('click', () => {
  isPlaying = false;
  $board.innerHTML = '';

  clearInterval(timer);
  timeLeft = 60;
  $timeElement.textContent = '60';

  $overlay.classList.add('transparent');
});
