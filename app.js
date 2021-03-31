const wordList = ['computer','book','fishing','basement','control','insulate','package','customer','outside','electrical','result','rubber','register']; //word list
const guess = document.querySelector('.guess'); //the element where the word goes
let word = wordList[Math.floor(Math.random() * Math.floor(wordList.length))].toUpperCase(); //select a word for the game
let strikes = 0;
let guessWord = '_'.repeat(word.length); //guessWord is what is displayed on the screen. It looks like this C__OM_UT_R
let letters = document.querySelectorAll('.letters p'); //elements of the letter buttons
guess.innerHTML = guessWord; //set the initial blank letters for the word
letters.forEach((item) => {item.addEventListener('click', () => {addLetters(item, item.innerHTML)})}); //on click event, run addLetters function


function addLetters(item, letter) {//Checks to see if chosen letter is in the word. If yes then it fills in the chosen letter on the screen. Else it adds a body part.
  if (!item.classList.contains('clicked')) {
    item.classList.add('clicked');
    if (word.includes(letter)) {
      for (let i=0; i<word.length; i++) {
        if (word[i] === letter) {
          temp1 = guessWord.substring(0,i+1);
          temp2 = guessWord.substring(i+1);
          guessWord = temp1.slice(0,-1) + letter + temp2;
        }  
      }
      guess.innerHTML = guessWord;
      setTimeout(checkWin, 1000);
    }
    else {
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
        setTimeout(youLose, 1000);
      }
      strikes++;
    }
  }
}

function checkWin() {
  if (guessWord === word) {
    document.querySelector('.grayScreen').style.display = 'block';
    document.querySelector('.winner').style.display = 'flex';
    document.querySelector('.playAgainWin').addEventListener('click', resetGame);
  }
}

function youLose() {
  document.querySelector('.loser').style.display = 'flex';
  document.querySelector('.playAgainLose').addEventListener('click', resetGame);
  document.querySelector('.result').innerHTML = word;
  document.querySelector('.grayScreen').style.display = 'block';
}

function resetGame() {
  document.querySelector('.grayScreen').style.display = 'none';
  document.querySelector('.winner').style.display = 'none';
  document.querySelector('.loser').style.display = 'none';
  let hideAll = document.querySelectorAll('.frame, .person div');
  hideAll.forEach((item) => item.style.display = 'none');
  letters.forEach((item) => item.classList.remove('clicked'));
  word = wordList[Math.floor(Math.random() * Math.floor(wordList.length))].toUpperCase();
  strikes = 0;
  guessWord = '_'.repeat(word.length);
  guess.innerHTML = guessWord;
}