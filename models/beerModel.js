var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewSchema = new Schema({
  userName: String,
  comment: String
})

var BeerSchema = new Schema({
  name: String,
  style: String,
  image_url: String,
  abv: Number,
  ratings: Number,
  numRate: Number,
  reviews: [reviewSchema]
})

var beer = mongoose.model("Beer", BeerSchema);
module.exports = beer;
