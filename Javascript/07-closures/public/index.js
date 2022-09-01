function additionFactory(x) {
    return function(y) {
        return x + y;
    };
}

startAddition = () => {
    const add100 = additionFactory(100);
    const add50 = additionFactory(50);
    console.log(add100(50));
    console.log(add50(50));
}

let changeFont = () => {
    let fontSize = 16;
    document.body.style.fontSize = fontSize + "px";
    function changeFontSize(val) {
        if(fontSize + val > 6 && fontSize + val < 32) {
            fontSize += val;
            document.body.style.fontSize = fontSize + "px";
        }
    }
    return {
        bigger: () => changeFontSize(2),
        smaller: () => changeFontSize(-2)
    }
}

let changeColor = () => {
    let color = "black";
    document.body.style.color = color;
    function changeColorTo(newColor) {
        color = newColor;
        document.body.style.color = color;
    }
    return {
        red: () => changeColorTo("red"),
        green: () => changeColorTo("green"),
        blue: () => changeColorTo("blue"),
        black: () => changeColorTo("black")
    }
}

window.onload = () => {
    let fontChanger = changeFont();
    document.getElementById("biggerFont").onclick = fontChanger.bigger;
    document.getElementById("smallerFont").onclick = fontChanger.smaller;
    let colorChanger = changeColor();
    document.getElementById("red").onclick = colorChanger.red;
    document.getElementById("green").onclick = colorChanger.green;
    document.getElementById("blue").onclick = colorChanger.blue;
    document.getElementById("black").onclick = colorChanger.black;
}