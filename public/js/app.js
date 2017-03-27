var app = angular.module('beerList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'beerCtrl'
    })
    .state('beer', {
      url: '/beers/:id',
      templateUrl: '/templates/beer.html',
      params: {BeerParam: null},
      controller: 'bCtrl'
    });

  $urlRouterProvider.otherwise('/home');
}]);
