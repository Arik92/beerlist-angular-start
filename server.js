var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/beers");
var Beer = require("./BeerModel");
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
  res.send('Testing Server')
});
app.get('/beers', function (req, res, next) {
  Beer.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })//find()

});//get /beers
app.post('/beers', function (req, res, next) {
  var b = new Beer(req.body);
  b.save(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  });
  //res.send('POST!');
});

app.delete("/beers/:id",function(req,res){
  Beer.findOneAndRemove({ _id: req.params.id }, function(err, beer) {
    if (err) {
      console.log(err);
      res.send("err");
    }  else {
      console.log(beer);
      res.send(beer);
    }
});
});
app.put('/beers/:id', function(req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(error, beer) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beer);
    }
  });
});
app.put('/beers/rate/:id', function(req, res, next) {
  Beer.findOneAndUpdate({ _id: req.params.id },  {$inc:  {ratings: req.body.currentRating, numRate: 1}}, { new: true }, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      console.log(beer);
      res.send(beer);
    }
  });
});


app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.");
});
