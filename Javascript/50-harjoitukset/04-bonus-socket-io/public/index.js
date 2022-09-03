
var socket = io();


send = (e) => {
    e.preventDefault();
    var input = document.getElementById("message");
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
}

window.onload = () => {
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        var item = document.createElement("li");
        item.textContent = msg;
        document.getElementById("messages").appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
};




