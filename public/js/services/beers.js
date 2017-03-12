app.factory('beerService', function($http){
  var beers = [];

  var getBeer = function(name){
    for (var i = 0;i< beers.length;i++){
      if (beers[i].name===name) {
        return beers[i];
      }//if
    }//for
  };//getBeer
  var getidByIndex = function(index) {
    for (var i = 0;i<= index;i++) {
      if (i===index) return beers[i]._id;
    }
    return "not found";
  }//getBeerByIndex
  var addBeer = function(beer) {
    beers[beers.length] = beer;
  };
  var remove = function(index) {
        beers.splice(index,1);
  }//remove

var getAvg = function(beer) {
  if (beer.numRate!==0) {
    beer.currAvg= (beer.ratings/beer.numRate);
  } else {
    beer.currAvg =("no ratings yet for this beer!");

  }
  return beer.currAvg;
}//getAvg
var getBeers = function() {
  return $http.get('/beers')
    .then(function(response) {
      angular.copy(response.data, beers);
    }, function(err) {
      console.error(err)
    });
};
var postBeer = function(beer) {
  return $http.post('/beers',beer)
    .then(function(response) {
      angular.copy(response.data, beers);
    }, function(err) {
      console.error(err)
    });
};

var deleteBeer = function(index) {
  var id = getidByIndex(index);
  return $http.delete('/beers/' + id) //delete the beer from mongo
    .then(function(response) {
      remove(index);
      getBeers();
    }, function(err) {
      console.error(err)
    });
}
var updateBeer = function(beer, index) {
  return $http.put('/beers/'+beer._id, beer)
  .then(function(response) {
    beers[index] = response.data;
    //angular.copy(response.data, beers);// Still problamatic??
    }, function(err) {
    console.error(err)
  });
}
var updateRate = function(beer, index) {
  return $http.put('/beers/rate/'+beer._id, beer)
  .then(function(response) {
    beers[index] = response.data;
    //angular.copy(response.data, beers);// Still problamatic??
    }, function(err) {
    console.error(err)
  });
}


  return {
    beers: beers,
    addBeer: addBeer,
    getBeer: getBeer,
    getAvg: getAvg,
    getBeers: getBeers,
    postBeer: postBeer,
    deleteBeer: deleteBeer,
    updateRate: updateRate,
    updateBeer: updateBeer
  }
})
