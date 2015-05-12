// requirements
var express = require("express"),
    app = express(),
    path = require("path");

// food index
var foods = [];

// root path
app.get("/", function(req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/assets/views/index.html'));
});

// listen on port 3000
app.listen(3000, function(){
  console.log("listening on port 3000");
});