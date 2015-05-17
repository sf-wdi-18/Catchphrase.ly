// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser"),
    db = require("./models");

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

// body parser config
app.use(bodyParser.urlencoded({ extended: true }));

// DATA //

function drop(Model){
  // removes all documents from this model
  Model.remove({}, function(err) { 
   console.log('all Foods documents removed');
  });
}
//drop(db.Foods);


// pre-seeded food data
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 4, name: "Kale", yumminess: "meh"}
];

// let's put those foods in our database!
function addFoods(foodList){
  for (var i=0; i<foodList.length; i++){
    db.Foods.create({name: foodList[i].name, yumminess: foodList[i].yumminess});
  }
}
//addFoods(foods);

// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// foods index path
app.get("/foods", function (req, res){
  // find *all* foods
  db.Foods.find({}, function(err, results){
    // send them as JSON-style string
    res.send(JSON.stringify(results));
  })
});

app.post("/foods", function (req, res){
  // find new food in the req.body (thanks body parser)
  var newFood = req.body;
  // add the new food to our db (mongoose will give it an _id)
  db.Foods.create(newFood);
  // respond with the created object as json string
  res.send(JSON.stringify(newFood));
});

app.post("/update", function(req, res){
  console.log("updating food with these params", req.body);
  // not using findByIdAndUpdate because I want to individually check
  // if we have new values for our name, yumminess
  db.Foods.findById(req.body.id, function (err, food) {
    if (err) {
      res.status(500).send({ error: 'database find error' });
    } else {
      if (req.body.name) {
        // if form gave us a new name, update the food's name
        food.name = req.body.name;
      }
      if (req.body.yumminess){
        // if form gave us a new yumminess, update that
        food.yumminess = req.body.yumminess;
      }
      // save the updated document
      food.save(function (err) {
        if (err){
          res.status(500).send({ error: 'database save error' });
        }
      });
    }
  });
  res.status(200).send();
});

app.delete("/foods/:id", function (req, res){
  // remove item in the db matching the id
  db.Foods.remove({_id: req.params.id}, function(err, results){
    if (err){
      res.status(500).send({ error: 'database error' });
    } else {
      res.status(200).send();
    }
  });
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function (){
  console.log("listening on port 3000");
});