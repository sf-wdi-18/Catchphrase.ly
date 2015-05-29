// SERVER

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
  // remove all documents from this model
  Model.remove({}, function(err) { 
   console.log('all Phrases documents removed');
  });
}
//drop(db.Phrases);


// pre-seeded phrase data
var phrases =[
  {id: 0, word: "JSON", definition: "JavaScript Object Notation"},
  {id: 1, word: "CRUD", definition: "Create, Read, Update, Delete"},
  {id: 2, word: "AJAX", definition: "Asynchronous JavaScript and XML"},
  {id: 3, word: "DB", definition: "database"}
];

// let's put those phrases in our database!
function addPhrases(phraseList){
  for (var i=0; i<phraseList.length; i++){
    db.Phrases.create({word: phraseList[i].word, definition: phraseList[i].definition});
  }
}
//addPhrases(phrases);

// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// phrases index path
app.get("/phrases", function (req, res){
  // find *all* phrases
  db.Phrases.find({}, function(err, results){
    // send them as JSON-style string
    res.send(JSON.stringify(results));
  })
});

app.post("/phrases", function (req, res){
  // find new phrase in the req.body (thanks body parser)
  var newPhrase = req.body;
  // add the new phrase to our db (mongoose will give it an _id)
  db.Phrases.create(newPhrase);
  // respond with the created object as json string
  res.send(JSON.stringify(newPhrase));
});

app.post("/update", function(req, res){
  console.log("updating phrase with these params", req.body);
  // not using findByIdAndUpdate because I want to individually check
  // if we have new values for our word, definition
  db.Phrases.findById(req.body.id, function (err, phrase) {
    if (err) {
      res.status(500).send({ error: 'database find error' });
    } else {
      if (req.body.word) {
        // if form gave us a new word, update the phrase's word
        phrase.word = req.body.word;
      }
      if (req.body.definition){
        // if form gave us a new definition, update that
        phrase.definition = req.body.definition;
      }
      // save the updated document
      phrase.save(function (err) {
        if (err){
          res.status(500).send({ error: 'database save error' });
        }
      });
    }
  });
  res.status(200).send();
});

app.delete("/phrases/:id", function (req, res){
  // remove item in the db matching the id
  db.Phrases.remove({_id: req.params.id}, function(err, results){
    if (err){
      res.status(500).send({ error: 'database error' });
    } else {
      res.status(200).send();
    }
  });
});

// listen!
app.listen(process.env.PORT || 3000, function (){
  console.log("listening");
});