app.factory('beerService', function($http){
        //make everything that has anything to do with the index send the beer as the parameter
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
      return response.data;
    }, function(err) {
      console.error(err)
    });
};
var postBeer = function(beer) {
  return $http.post('/beers',beer)
    .then(function(response) {
      return response.data;
    }, function(err) {
      console.error(err)
    });
};

var deleteBeer = function(beer) {
  return $http.delete('/beers/' + beer._id) //delete the beer from mongo
    .then(function(response) {
      return response.data;
      getBeers();
    }, function(err) {
      console.error(err)
    });
}
var updateBeer = function(beer) {
  return $http.put('/beers/'+beer._id, beer)
  .then(function(response) {
    return response.data;
    }, function(err) {
    console.error(err)
  });
}
var updateRate = function(beer) {
  return $http.put('/beers/rate/'+beer._id, beer)
  .then(function(response) {
    return response.data;    
    }, function(err) {
    console.error(err)
  });
}

  return {
    getAvg: getAvg,
    getBeers: getBeers,
    postBeer: postBeer,
    deleteBeer: deleteBeer,
    updateRate: updateRate,
    updateBeer: updateBeer
  }
})
