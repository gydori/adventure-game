const dictionary = ['alma', 'korte', 'barack', 'ananasz'];
let word;
let guessedWord = [];
let life;

const generateWord = () => {
  let random = Math.floor(Math.random() * dictionary.length);
  word = dictionary[random];
  for (let i = 0; i < word.length; i++) {
    guessedWord.push('_');
  }
  life = Math.floor(word.length / 2);
};

const printGame = () => {
  console.log(guessedWord.join(' ') + '\n' + 'élet: ' + life);
};

const isSolved = () => {
  let count = 0;
  for (let i = 0; i < guessedWord.length; i++) {
    if (guessedWord[i] === '_') {
      count++;
    }
  }
  if (count === 0) {
    return true;
  } else {
    return false;
  }
};

const makeGuess = (e) => {
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === e) {
      guessedWord[i] = e;
      count++;
    }
  }
  if (count === 0) {
    return false;
  } else {
    return true;
  }
};

const main = () => {
  console.log('Üdvözöllek az Akasztófa játékban!');
  generateWord();
  printGame();
  let readLine = require('readline-sync');
  while (true) {
    let key = readLine.keyIn();
    let vanE = makeGuess(key);
    if (vanE === false) {
      life--;
    }
    printGame();
    if (key === 'q') {
      console.log('Kiléptél a játékból.');
      break;
    }
    if (isSolved() === true) {
      console.log('Nyertél');
      break;
    }
    if (life === 0) {
      console.log('Veszítettél');
      break;
    }
  }
};

main();

module.exports = {
  dictionary,
  word,
  guessedWord,
  lifeAkaszto: life,
  generateWord,
  printGame,
  isSolved,
  makeGuess,
  main
};
