var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: String,
  style: String,
  image_url: String,
  abv: Number,
  ratings: Number,
  numRate: Number
})

var beer = mongoose.model("Beer", BeerSchema);
module.exports = beer;
