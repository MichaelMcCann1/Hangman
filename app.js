// Selectors
const wordList = ['computer','book','fishing','basement','control','insulate','package','customer','outside','electrical','result','rubber','register','dryer','mirror','calculator','binder','purse'];
const correctLettersSelector = document.querySelector('.correctLetters');
const lettersSelector = document.querySelectorAll('.letters > div');
const grayScreenSelector = document.querySelector('.grayScreen')

// Global Variables
let currentWord
let strikes 
let correctLetters

resetGame()

lettersSelector.forEach((letter) => {
  letter.addEventListener('click', () => {
    checkLetters(letter, letter.textContent)
  })
})

function resetGame(){
  currentWord = wordList[Math.floor(Math.random() * Math.floor(wordList.length))].toUpperCase();
  strikes = 0;
  correctLetters = '_'.repeat(currentWord.length); 
  correctLettersSelector.textContent = correctLetters;
}

function checkLetters(item, letter){
  if (item.classList.contains('clicked')) return
  item.classList.add('clicked');
  if (currentWord.includes(letter)) {
    for (let i=0; i<currentWord.length; i++) {
      if (currentWord[i] === letter) {
        beforeLetter = correctLetters.substring(0,i);
        afterLetter = correctLetters.substring(i+1);
        correctLetters = beforeLetter + letter + afterLetter;
      }  
    }
    correctLettersSelector.textContent = correctLetters;
    checkWin()
  } else {
    addBodyPart()
  }
}

function addBodyPart(){
  if (strikes === 0) {
    document.querySelector('.frame').style.display = 'block';
  } else if (strikes === 1) {
    document.querySelector('.head').style.display = 'block';
  } else if (strikes === 2) {
    document.querySelector('.torso').style.display = 'block';
  } else if (strikes === 3) {
    document.querySelector('.leftArm').style.display = 'block';
  } else if (strikes === 4) {
    document.querySelector('.rightArm').style.display = 'block';
  } else if (strikes === 5) {
    document.querySelector('.leftLeg').style.display = 'block';
  } else {
    document.querySelector('.rightLeg').style.display = 'block';
    youLose()
  }
  strikes++;
}

function checkWin(){
  if (correctLetters === currentWord) {
    youWin()
  }
}

function youWin(){
  grayScreenSelector.style.display = 'block';
  grayScreenSelector.classList.add('active')
  setTimeout(() => {
    grayScreenSelector.classList.remove('active')
    document.querySelector('.winner').style.display = 'flex';
    document.querySelector('.winner .playAgain').addEventListener('click', clearGame);
  }, 1000);
}

function youLose(){
  grayScreenSelector.style.display = 'block';
  grayScreenSelector.classList.add('active')
  setTimeout(() => {
    grayScreenSelector.classList.remove('active')
    document.querySelector('.loser').style.display = 'flex';
    document.querySelector('.loser .playAgain').addEventListener('click', clearGame);
    document.querySelector('.answer').textContent = currentWord;
  }, 1000);
}

function clearGame(){
  grayScreenSelector.style.display = 'none';
  document.querySelector('.winner').style.display = 'none';
  document.querySelector('.loser').style.display = 'none';

  const bodyPartsSelector = document.querySelectorAll('.frame, .person > div');
  bodyPartsSelector.forEach(item => item.style.display = 'none');
  lettersSelector.forEach(item => item.classList.remove('clicked'));

  resetGame()
}