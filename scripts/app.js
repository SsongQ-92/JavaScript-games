// 게임 시작 화면 관련
const $startScreen = document.querySelector('#start-screen');

// 게임 실행 화면 관련
// 1. hero stat
const $heroStat = document.querySelector('#hero-stat');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');

const $firstDivideLine = document.querySelector('#first-divide-line');

// 2. game menu
const $gameMenu = document.querySelector('#game-menu');
const $menuAdventure = document.querySelector('#menu-1');
const $menuRest = document.querySelector('#menu-2');
const $menuExit = document.querySelector('#menu-3');

// 3. battle menu
const $battleMenu = document.querySelector('#battle-menu');

const $secondDivideLine = document.querySelector('#second-divide-line');

// 4. message
const $message = document.querySelector('#message');

const $thirdDivideLine = document.querySelector('#third-divide-line');

// 5. monster stat
const $monsterStat = document.querySelector('#monster-stat');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');

const createHero = function () {
  const hero = {
    name: '',
    level: 1,
    maxHp: 100,
    hp: 100,
    xp: 0,
    att: 10,
  };

  return {
    changeHeroName(name) {
      hero.name = name;
    },
    displayHeroStat() {
      $heroName.textContent += hero.name;
      $heroLevel.textContent += `${hero.level}`;
      $heroHp.textContent += `${hero.hp}/${hero.maxHp}`;
      $heroXp.textContent += `${hero.xp}/${15 * hero.level}`;
      $heroAtt.textContent += `${hero.att}`;
    },
  };
};

const createMonster = function () {
  let monster = null;
  const monsterList = [
    { name: '슬라임', hp: 25, att: 10, xp: 10 },
    { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
    { name: '마왕', hp: 150, att: 35, xp: 50 },
  ];

  return {
    createRandomMonster() {
      monster = structuredClone(monsterList[Math.floor(Math.random() * monsterList.length)]);
      return monster;
    },
    displayRandomMonsterStat() {
      monster.maxHp = monster.hp;
      $monsterName.textContent += monster.name;
      $monsterHp.textContent += `${monster.hp}/${monster.maxHp}`;
      $monsterAtt.textContent += monster.att;
    },
  };
};

$startScreen.addEventListener('submit', e => {
  e.preventDefault();

  const name = e.target['name-input'].value;
  if (name.trim() === '') return;

  $startScreen.style.cssText = 'display: none;';
  $heroStat.classList.toggle('transparent');
  $firstDivideLine.classList.toggle('transparent');
  $gameMenu.classList.toggle('transparent');

  const hero = createHero();
  hero.changeHeroName(name);
  hero.displayHeroStat();
});

$menuAdventure.addEventListener('click', () => {
  $gameMenu.classList.toggle('transparent');
  $battleMenu.classList.toggle('transparent');
  $secondDivideLine.classList.toggle('transparent');
  $monsterStat.classList.toggle('transparent');

  const monster = createMonster();
  monster.createRandomMonster();
  monster.displayRandomMonsterStat();
});
