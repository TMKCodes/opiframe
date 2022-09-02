roll = () => {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    return dice1 + dice2;
}

rollWin = (winText) => {
    let rollButton = document.getElementById("rollButton");
    rollButton.disabled = true;
    let startButton = document.getElementById("startButton");
    startButton.disabled = false;
    let select = document.getElementById("passSelect");
    select.disabled = false;
    let result = document.getElementById("result");
    result.innerHTML = winText;
}

rollAgain = () => {
    let result = document.getElementById("result");
    result.innerHTML = "Roll again!";
}

window.onload = () => {
    let container = document.getElementById("container");
    let header = document.createElement("h1");
    header.innerHTML = "Craps!";
    container.appendChild(header);
    let select = document.createElement("select");
    select.id = "passSelect"
    let optionYes = document.createElement("option");
    optionYes.innerHTML = "Pass";
    optionYes.value = "pass";
    let optionNo = document.createElement("option");
    optionNo.innerHTML = "Don't pass";
    optionNo.value = "don't pass";
    select.appendChild(optionYes);
    select.appendChild(optionNo);
    container.appendChild(select);
    let startButton = document.createElement("button");
    startButton.id = "startButton";
    startButton.innerHTML = "Start game";
    startButton.onclick = () => {
        let startButton = document.getElementById("startButton");
        startButton.disabled = true;
        let select = document.getElementById("passSelect");
        select.disabled = true;
        let rollButton = document.getElementById("rollButton");
        rollButton.disabled = false;
    }
    container.appendChild(startButton);
    let br = document.createElement("br");
    container.appendChild(br);
    let rollButton = document.createElement("button");
    rollButton.id = "rollButton";
    rollButton.disabled = true;
    rollButton.innerHTML = "Roll";
    rollButton.onclick = () => {
        let roller = document.getElementById("rollCount").innerHTML;
        roller++;
        document.getElementById("rollCount").innerHTML = roller;
        let rollValue = roll();
        let rollSpan = document.getElementById("rolled");
        rollSpan.innerHTML = rollValue;
        let gameType = document.getElementById("passSelect").value;
        if(roller == 1) {
            let rollPointSpan = document.getElementById("rollPoint");
            rollPointSpan.innerHTML = rollValue;
            if(gameType == "pass") {
                if(rollValue == 7 || rollValue == 11) {
                    rollWin("You win!");
                } else if(rollValue == 2 || rollValue == 3 || rollValue == 12) {
                    rollWin("You lose!");
                } else {
                    rollAgain();
                }
            } else if(gameType == "don't pass") {
                if(rollValue == 2 || rollValue == 3) {
                    rollWin("You win!");
                } else if(rollValue == 7 || rollValue == 11) {
                    rollWin("You lose!");
                } else {
                    rollAgain();
                }
            }
        } else {
            if(gameType == "pass") {
                let rollPoint = parseInt(document.getElementById("rollPoint").innerHTML);
                if(rollValue == rollPoint) {
                    rollWin("You win!");
                } else if(rollValue == 7) {
                    rollWin("You lose!");
                } else {
                    rollAgain();
                }
            } else if(gameType == "don't pass") {
                if(rollValue == 7) {
                    rollWin("You win!");
                } else if(rollValue == rollPoint) {
                    rollWin("You lose!");
                } else {
                    rollAgain();
                }
            }
        }
    }
    container.appendChild(rollButton);

    let rollCounter = document.createElement("p");
    let rollCounterText = document.createTextNode("Roll count: ");
    rollCounter.appendChild(rollCounterText);
    let rollCount = document.createElement("span")
    rollCount.id = "rollCount";
    let rollCountText = document.createTextNode("0");
    rollCount.appendChild(rollCountText);
    rollCounter.appendChild(rollCount);
    container.appendChild(rollCounter);

    let rollPoint = document.createElement("p");
    let rollPointText = document.createTextNode("Roll point: ");
    rollPoint.appendChild(rollPointText);
    let rollPointSpan = document.createElement("span");
    rollPointSpan.id = "rollPoint";
    let rollPointSpanText = document.createTextNode("");
    rollPointSpan.appendChild(rollPointSpanText);
    rollPoint.appendChild(rollPointSpan);
    container.appendChild(rollPoint);

    let rolled = document.createElement("p");
    let rolledText = document.createTextNode("Current roll: ");
    rolled.appendChild(rolledText);
    let rolledSpan = document.createElement("span");
    rolledSpan.id = "rolled";
    let rolledSpanText = document.createTextNode("");
    rolledSpan.appendChild(rolledSpanText);
    rolled.appendChild(rolledSpan);
    container.appendChild(rolled);

    let result = document.createElement("p");
    let resultText = document.createTextNode("Result: ");
    result.appendChild(resultText);
    let resultSpan = document.createElement("span");
    resultSpan.id = "result";
    let resultSpanText = document.createTextNode("");
    resultSpan.appendChild(resultSpanText);
    result.appendChild(resultSpan);
    container.appendChild(result);

}