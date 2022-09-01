const express = require("express");

let users = [];

let app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log('listening on port 3000');
});
