/****************************************
                SERVER
****************************************/

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

// body parser config
app.use(bodyParser.urlencoded({ extended: true }));

// DATA //

// pre-seeded phrase data
var phrases =[
  {id: 0, word: "JSON", definition: "JavaScript Object Notation"},
  {id: 1, word: "HTTP", definition: "Hyper Text Transfer Protocol"}
];

// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// phrases index path
app.get("/phrases", function (req, res){
  console.log("request get /phrases");
  // render phrases index as JSON
  res.send(JSON.stringify(phrases));
});

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000");
});