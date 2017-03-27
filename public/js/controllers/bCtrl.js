app.controller('bCtrl', function($scope, $stateParams, beerService){
  if (!$stateParams.BeerParam) {
    console.log("scope id is "+$stateParams.id);
    beerService.getBeerById($stateParams.id).then(function(res, err){
      if (err) {
        console.log(err)
      } else {
        $scope.beer = res;
      }
    })
  }//make $http request
  else {
    $scope.beer = $stateParams.BeerParam;
  console.log($scope.beer);
}
});
