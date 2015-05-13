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

// pre-seeded food data
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
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
  // grab the highest id, increment by 1 and set as the new food's id
  newFood.id = foods[foods.length - 1].id + 1;
  // add to our food array
  foods.push(newFood);
  // render the created object as json
  res.send(JSON.stringify(newFood));
});

app.delete("/foods/:id", function (req, res){
  debugger;
  // set the value of the id
  var targetId = parseInt(req.params.id, 10);
  // find item in the array matching the id
  var targetItem = _.findWhere(foods, {id: targetId});
  // get the index of the found item
  var index = foods.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  foods.splice(index, 1);
  // render deleted object
  res.send(JSON.stringify(targetItem));
});

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000");
});