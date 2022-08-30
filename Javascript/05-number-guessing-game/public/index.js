var playerName = "";
var numberOfGuesses = 0;
var maximumGuess = 100;
var minimumGuess = 1;
var target = 0;


function pressEnter(event) {
    if(event.key == "Enter") {
        if(event.target.id == "guessInput") {
            guessNumber();
        } else if(event.target.id == "nameInput") {
            startGame();
        }
    }
}

function startGame() {
    let nameInput = document.getElementById("nameInput");
    let startButton = document.getElementById("startButton");
    let gameContainer = document.getElementById("game");
    let guessInput = document.getElementById("guessInput");
    let guessButton = document.getElementById("guessButton");
    let result = document.getElementById("result");
    if(nameInput.value != NaN) {
        playerName = nameInput.value;
        target = Math.floor(Math.random() * 100) + 1;
        nameInput.disabled = true;
        startButton.disabled = true;
        gameContainer.style.display = "block";
        guessButton.disabled = false;
        guessInput.disabled = false;
        guessInput.select();
        result.innerText = "";
    }
}

function guessNumber() {
    let nameInput = document.getElementById("nameInput");
    let startButton = document.getElementById("startButton");
    let guessInput = document.getElementById("guessInput");
    let guessButton = document.getElementById("guessButton");
    let result = document.getElementById("result");
    if(!isNaN(guessInput.value)) {
        numberOfGuesses++;
        if(guessInput.value < minimumGuess) {
            result.append("You entered too low guess.\r\n");
            guessInput.select();
        } else if(guessInput.value > maximumGuess) {
            result.append("You entered too high guess.\r\n");
            guessInput.select();
        } else if(guessInput.value < target) {
            result.append("Your guess is too low.\r\n");
            guessInput.select();
        } else if(guessInput.value > target) {
            result.append("Your guess is too high.\r\n");
            guessInput.select();
        } else if(guessInput.value == target) {
            result.append("You " + playerName + " guessed the number! With only " + numberOfGuesses + " guesses\r\n");
            guessButton.disabled = true;
            guessInput.disabled = true;
            nameInput.disabled = false;
            startButton.disabled = false;
        }
    }
}

