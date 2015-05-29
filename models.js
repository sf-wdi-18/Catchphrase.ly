// DATABASE 
var mongoose = require("mongoose");

mongoose.connect( process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL || 
               "mongodb://localhost/Phrases_app");
var Schema = mongoose.Schema;

var PhraseSchema = new Schema({
	word: String,
	definition: String
});

var Phrases = mongoose.model("Phrases", PhraseSchema);

module.exports.Phrases = Phrases;
