const express = require("express");

let app = express();

let port = process.env.PORT || 3000;

let userDB = [];
let id = 100;

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get("/api/users", (req, res) => {
    // TODO: remove passwords in return.
    res.status(200).json(userDB);
});

app.get("/api/users/:id", (req, res) => {
    // TODO: remove password in return.
    let id = req.params.id;
    let user = userDB.find(function(user) {
        return user.id == id;
    });
    return res.status(200).json(user);
});

app.post("/api/users/", (req, res) => {
    if(req.body.username == undefined) {
        return res.status(400).send({"message" : "Required: username"});
    }
    if(req.body.email == undefined) {
        return res.status(400).send({"message" : "Required: email"});
    }
    // TODO: add password generation for authentication.
    let user = {
        "id" : id,
        "username" : req.body.username,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "email" : req.body.email,
        "phone" : req.body.phone,
    };
    userDB.push(user);
    id++;
    return res.status(201).json(user);
});

app.put("/api/users/:id", (req, res) => {
    let modifiedUser = {
        "id" : parseInt(req.params.id, 10),
        "username" : req.body.username,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "email" : req.body.email,
        "phone" : req.body.phone,
    };
    let index = userDB.findIndex(user => user.id == modifiedUser.id);
    if(index == -1) {
        return res.status(404).send({"message" : "User not found"});
    }
    userDB.splice(index, 1, modifiedUser);
    return res.status(200).json(modifiedUser);
});

app.delete("/api/users/:id", (req, res) => {
    let id = parseInt(req.params.id, 10);
    let tempDB = userDB.filter(user => user.id !== id);
    if(tempDB.length == userDB.length) {
        return res.status(404).json({"message" : "Not found: id"});
    } else { 
        userDB = tempDB;
        return res.status(200).json({"message" : "Deleted."});
    }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});