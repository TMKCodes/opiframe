const express = require("express");

let users = [];

let app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.post('/contact', (req, res) => {
    users.push({ "name" : req.body.name, 
                "email" : req.body.email, 
                "phone" : req.body.phone });
    res.status(200).json(users);
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});