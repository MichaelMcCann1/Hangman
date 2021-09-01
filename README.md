# Hangman

The classic game of Hangman. Try to solve the puzzle by guessing the correct letters. If you guess too many incorrect letters you lose!

This game was made with vanilla JavaScript and has a responsive design to fit any screen.

<img src="https://github.com/MichaelMcCann1/Hangman/blob/main/hangmanScreenshot.png" height="300px">


## Code Explination

The game begins by calling the `resetGame()` function. This function selects the word for the game by randomly choosing a word from an array of possible words. This word is stored in the `currentWord` variable. Then the blank letters for the word are displayed on the screen above the list of letters you can choose from. The variable used to store the current correct letters is called `correctLetters`.

``` javascript
correctLetters = '_'.repeat(currentWord.length); 
correctLettersSelector.textContent = correctLetters;
```

### Choosing a letter

A 'click' event listener is added to each of the letters you can choose from. Once a letter is clicked on the `checkLetters()` function is called. The arguments passed into this function are the element of the letter that was selected and the textContent of the letter. 

First the function checks to see if the letter has already been selected before with `if (!item.classList.contains('clicked'))`. If it has then the function returns nothing. Otherwise it will set the letter to have a class of 'clicked' which will prevent it from being selected again. Next it checks to see if the selected letter is contained inside `currentWord` with `if (currentWord.includes(letter))`. If it is then the appropriate underscores are changed to the letter that was selected. After every correct letter guess the game checks to see if the player has correctly solved the puzzle with the `checkWin()` function. The `checkWin()` function simply checks to see if `correctLetters === currentWord`. If it is then the `youWin()` function is called which lets the player know they won.

If the letter is not in the word then that means the player was wrong and a body part is added to the gallows by calling the `addBodyPart()` function.

``` javascript
function checkLetters(item, letter){
  if (!item.classList.contains('clicked')) {
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
}
```

### Updating the Gallows

The variable `strike` keeps track of how many times a player incorrectly guessed a letter. With each incorrect guess a new body part of the gallows is added and another strike is also added. Body parts are added by changing their dispay from 'none' to block'. If the player receives too many strikes then they lose and the `youLose()` function is called. This function tells the player they lost and shows the answer to the puzzle.

``` javascript
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
```

### Game Over

At the end of the game either the `youWin()` or `youLose()` function is called depending on if the player won or lost. Both functions do essentially the same thing. They both display a modal and a popup message that lets them know if the won or lost. A modal is immediately displayed that is completely transparent. The point of the modal is to prevent the player from selecting more letters after the game is completed. A `setTimeout()` method is applied to give a brief delay before the modal changes color to a more traditional gray color with the popup message. This gives the player time to see either the completed word or the completed gallows before the popup message covers them up.

A 'click' event listener is attached to the Play Again button that runs the `clearGame()` function. This function removes the modal, removes the popup message, resets the gallows, and removes the 'clicked' class from all the letters. It then runs the `resetGame()` function which was described earlier. This completes an entire round of the game and a new round can be started.

``` javascript
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
```
