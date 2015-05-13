// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

// body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATA //

// food index
var foods =[
  {name: "Sushiritto", yumminess: "quite"},
  {name: "Green Eggs & Ham", yumminess: "sure"},
  {name: "Crayfish", yumminess: "depending"},
  {name: "Foie Gras", yumminess: "omg"},
  {name: "Kale", yumminess: "meh"}
];

// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// foods index path
app.get("/foods", function (req, res){
  // render foods index as JSON
  res.send(JSON.stringify(foods));
});

app.post("/foods", function (req, res){
  // find new food in the req.body (thanks body parser)
  var newFood = req.body;
  foods.push(newFood);
  // add it to our food array
  // foods.push(newFood);
  // render the created object as json
  res.send(newFood);
});

app.delete("/foods", function (req, res){
  //delete food from the array
});

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000");
});