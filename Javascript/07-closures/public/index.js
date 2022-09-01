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
        fontSize += val;
        document.body.style.fontSize = fontSize + "px";
    }
    return {
        bigger: () => changeFontSize(2),
        smaller: () => changeFontSize(-2)
    }
}

window.onload = () => {
    let fontChanger = changeFont();
    document.getElementById("biggerFont").onclick = fontChanger.bigger;
    document.getElementById("smallerFont").onclick = fontChanger.smaller;
}