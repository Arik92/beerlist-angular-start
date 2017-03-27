var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

// router.get('/', function(req, res) {
//   res.send('Testing Server')
// });
router.get('/', function (req, res, next) {
  Beer.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })//find()

});//get /beers
router.get('/:id', function(req, res, next){
  Beer.findOne({_id: req.params.id}, function(err, resultBeer){
    if (err) {
      console.log(err);
    } else {
      res.send(resultBeer);
    }//else
  })
})
router.post('/', function (req, res, next) {
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
router.post('/:id/reviews', function(req, res, next) {
  //var r = new Review();
  Beer.findOne({_id: req.params.id }, function(err, beer){
    if (err) {
      console.log(err);
      res.send(err);

    } else {
      console.log("found beer is: ");
      console.log(beer);
      beer.reviews.push(req.body);
      beer.save(function(error, resolve){
        if (error) {
          console.log(error);
        } else {
          console.log(resolve);
          res.send(resolve);
        }
      }); //beer save
    } // else found beer
  })// finding beer in mongod

});// add review to a beer

router.delete('/:id/reviews/:revId', function(req, res, next) {
  Beer.findOne({_id: req.params.id }, function(err, beer){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("found beer is: ");
      console.log(beer);
      var index = -1;
        for (var i = 0;i<beer.reviews.length;i++) {
        if (beer.reviews[i].id===req.params.revId) {
          index = i;
        }//if finding review index
      }//for i
      if (index!=-1) {
        beer.reviews.splice(index,1);
        beer.save(function(error, resolve){
          if (error) {
            console.log(error);
          } else {
            console.log(resolve);
            console.log("Object deleted");
            res.send(resolve);
          }// else resolve
      });
      }//if -1
    } // else found beer
  })// finding beer in mongod

});// add review to a beer

router.delete("/:id",function(req,res){
  Beer.findOneAndRemove({ _id: req.params.id }, function(err, beer) {
    if (err) {
      console.log(err);
      res.send(err);
    }  else {
      console.log(beer);
      res.send(beer);
    }
});
});
router.put('/:id', function(req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(error, beer) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beer);
    }
  });
});
router.put('/rate/:id', function(req, res, next) {
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

module.exports = router;
