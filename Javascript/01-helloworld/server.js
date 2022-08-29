const express = require("express");

let app = express();

app.use(express.static("public"));

app.get("/greeting/:name", (req, res) => {
  return res.status(200).json({ "greeting" : "Hello " + req.params.name });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
