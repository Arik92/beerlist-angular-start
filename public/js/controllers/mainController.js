app.controller('beerCtrl', function($scope, beerService){
  $scope.tempBeers=[];
  $scope.deleteBeer = function(beer){
    beerService.deleteBeer(beer).then(function(){
      $scope.update();
        }, function(err){
      console.log(err);
    })//err
  }//deleteBeer


  $scope.getAvg = beerService.getAvg; //rating calculation

$scope.put = function(index){
  beerService.updateBeer($scope.beers[index]).then(function(response){
    $scope.beers[index] = response.data;
    $scope.tempBeers[index] = null;
    $scope.update();
  },function(err){
    console.log(err);
  })
}// put    general

  $scope.addToBeers = function(){
    var res = {
      name: $scope.name,
      style: $scope.style,
      abv: $scope.abv,
      image_url: $scope.image,
      ratings: 0,
      numRate: 0
    };
    beerService.postBeer(res).then(function(newBeer){
      $scope.beers.push(newBeer);
    }, function(err){
      console.log(err);
    });
  };//                                  addToBeers

  $scope.rate = function(beer){
    beerService.updateRate(beer).then(function(){
      $scope.update();
    }, function(err){
      console.log(err);
    })
  }//                          rate update
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

  $scope.enableShift = function(beer, index) {
    if ($scope.tempBeers[index]) {
      $scope.beers[index] = $scope.tempBeers[index];
      $scope.tempBeers[index]= null;
    } else {
      $scope.tempBeers[index] = angular.copy(beer);
  };//                                        SORT
}// enableShift

  $scope.update = function(){
    beerService.getBeers().then(function(dataB) {
      $scope.beers = dataB;
      } , function(err) {
          console.log(err);
        });
  }// update
  $scope.update();

});
