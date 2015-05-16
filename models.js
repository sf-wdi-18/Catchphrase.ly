var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Foods_app");
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	name: String,
	yumminess: String
});

var Foods = mongoose.model("Foods", FoodSchema);

module.exports.Foods = Foods;
