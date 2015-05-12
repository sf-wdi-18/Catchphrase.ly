// requirements
var express = require("express"),
    app = express(),
    path = require("path");

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

// food index
var foods =[
  "Sushiritto", "Green Eggs & Ham", "Crayfish",
  "Foie Gras", "Taco", "Kale"
];

// root path
app.get("/", function(req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// foods index path
app.get("/foods", function(req, res){
  // render foods index as JSON
  res.send(JSON.stringify(foods));
});

// listen on port 3000
app.listen(3000, function(){
  console.log("listening on port 3000");
});