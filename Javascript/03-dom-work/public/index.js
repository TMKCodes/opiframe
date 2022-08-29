function changeColor() {
    console.log("Changing color");
    var header = document.getElementById("header");
    var color = "#";
    const letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    header.style.color = color;
    console.log("to " + color);
}