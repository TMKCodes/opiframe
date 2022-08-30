
var canvas;
var ctx;
var running = 0;
var interval;

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
         x: Math.floor(evt.clientX - rect.left),
        y: Math.floor(evt.clientY - rect.top)
    };
}

function writeMessage(message) {
    clearCanvas();
    ctx.font = "12pt Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(message, 10, 25);
    //ctx.fillText(message, canvas.width / 2 - ctx.measureText(message).width / 2, canvas.height / 2);
    
}

function mouseMove(evt) {
    console.log("Mouse moved.");
    let mousePos = getMousePos(evt);
    writeMessage("x: " + mousePos.x + " y: " + mousePos.y);
}

function drawRect(evt) {
    let x, y = 0;
    let side = 0;
    let color = "#";
    const colorpicker = "ABCDEF0123456789";
    x = Math.floor(Math.random() * canvas.width);
    y = Math.floor(Math.random() * canvas.height);
    side = Math.floor(Math.random() * 80) + 20;
    for (let i = 0; i < 6; i++) {
        color += colorpicker[Math.floor(Math.random() * 16)];
    }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, side, side);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startCanvas() {
    let startButton = document.getElementById("startButton");
    if(running) {
        running = 0;
        startButton.value = "Start";
        clearCanvas();
        clearInterval(interval);
    } else {
        running = 1;
        startButton.value = "Stop";
        interval = setInterval(drawRect, 200);
    }
}

window.onload = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}