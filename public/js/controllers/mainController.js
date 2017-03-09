app.controller('beerCtrl', function($scope, beerService){
  $scope.beers = beerService.beers;
  $scope.remove = beerService.remove;
  $scope.getAvg = beerService.getAvg;

  $scope.addToBeers = function(){
    var res = {
      name: $scope.name,
      style: $scope.style,
      abv: $scope.abv,
      image_url: $scope.image,
    };
    $scope.addBeer(res);
  };//addToBeers
  $scope.rate = function(beer){
    beerService.updateAvg(parseInt(beer.currentRating), beer);
  }//rate adds the rating, and updates the average for the beer
  var sortConst=0;
  $scope.beerSort = function(){
    if (sortConst%2===0){
    $scope.beers.sort(function(a,b) {
      return a.currAvg - b.currAvg;
  });
} else {
  $scope.beers.sort(function(a,b) {
    return b.currAvg - a.currAvg;
});
}//else
sortConst++;
  }//beerSort
  $scope.enable=false;
  $scope.enableShift = function() {
    if ($scope.enable) {
      $scope.enable = false;
    } else {
      $scope.enable = true;
    }//else
  }
});
