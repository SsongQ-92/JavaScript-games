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
const $battleAttack = document.querySelector('#battle-1');
const $battleRecover = document.querySelector('#battle-2');
const $battleFlee = document.querySelector('#battle-3');

const $secondDivideLine = document.querySelector('#second-divide-line');

// 4. message
const $message = document.querySelector('#message');

const $thirdDivideLine = document.querySelector('#third-divide-line');

// 5. monster stat
const $monsterStat = document.querySelector('#monster-stat');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');

class Game {
  constructor() {
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 150, att: 35, xp: 50 },
    ];
    this.hero = null;
    this.heroName = null;
    this.randomMonster = null;
  }

  start() {
    $menuAdventure.addEventListener('click', this.clickAdventureMenu);
    $battleAttack.addEventListener('click', this.clickBattleAttack);

    this.hero = new Hero(1, 100, 100, 0, 10);
    this.hero.changeName(this.heroName);
    this.hero.displayHeroStat();

    this.changeScreen('gameScreen');
  }

  changeScreen(screen) {
    if (screen === 'gameScreen') {
      $startScreen.classList.toggle('transparent');
      $heroStat.classList.toggle('transparent');
      $firstDivideLine.classList.toggle('transparent');
      $gameMenu.classList.toggle('transparent');
    } else if (screen === 'adventure') {
      $gameMenu.classList.toggle('transparent');
      $battleMenu.classList.toggle('transparent');
      $secondDivideLine.classList.toggle('transparent');
      $monsterStat.classList.toggle('transparent');
    } else if (screen === 'battle') {
      $thirdDivideLine.classList.toggle('transparent');
      $message.classList.toggle('transparent');
    }
  }

  clickAdventureMenu = () => {
    this.changeScreen('adventure');

    this.randomMonster = new Monster(this.monsterList);
    this.randomMonster.displayMonsterStat();
  };

  clickBattleAttack = () => {
    this.changeScreen('battle');

    this.hero.attack(this.randomMonster);
    this.randomMonster.attack(this.hero);
    this.hero.updateHeroStat();
    this.randomMonster.updateMonsterStat();
    $message.textContent = `${this.hero.att}의 데미지를 주고, ${this.randomMonster.att}의 데미지를 받았다!`;
  };
}

class Hero {
  constructor(level, maxHp, hp, xp, att) {
    this.name = null;
    this.level = level;
    this.maxHp = maxHp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }

  changeName(name) {
    this.name = name;
  }

  displayHeroStat() {
    $heroName.textContent += this.name;
    $heroLevel.textContent += `${this.level}`;
    $heroHp.textContent += `${this.hp}/${this.maxHp}`;
    $heroXp.textContent += `${this.xp}/${15 * this.level}`;
    $heroAtt.textContent += `${this.att}`;
  }

  updateHeroStat() {
    $heroLevel.textContent = `2. 캐릭터 레벨: ${this.level}`;
    $heroHp.textContent = `3. 캐릭터 HP: ${this.hp}/${this.maxHp}`;
    $heroXp.textContent = `4. 캐릭터 XP: ${this.xp}/${15 * this.level}`;
    $heroAtt.textContent = `5. 캐릭터 공격력: ${this.att}`;
  }

  attack(monster) {
    monster.hp -= this.att;
  }

  heal(monster) {
    this.stat.hp += 20;
    this.stat.hp -= monster.att;
  }
}

class Monster {
  constructor(monsterList) {
    const randomMonster = structuredClone(
      monsterList[Math.floor(Math.random() * monsterList.length)]
    );
    this.name = randomMonster.name;
    this.hp = randomMonster.hp;
    this.maxHp = randomMonster.hp;
    this.att = randomMonster.att;
    this.xp = randomMonster.xp;
  }

  displayMonsterStat() {
    $monsterName.textContent += this.name;
    $monsterHp.textContent += `${this.hp}/${this.maxHp}`;
    $monsterAtt.textContent += this.att;
  }

  updateMonsterStat() {
    $monsterHp.textContent = `2. 몬스터 HP: ${this.hp}/${this.maxHp}`;
    $monsterAtt.textContent = `3. 몬스터 공격력: ${this.att}`;
  }

  attack(target) {
    target.hp -= this.att;
  }
}

let game = null;

$startScreen.addEventListener('submit', e => {
  e.preventDefault();

  const name = e.target['name-input'].value;
  if (name.trim() === '') return;

  game = new Game();
  game.heroName = name;
  game.start();
});
