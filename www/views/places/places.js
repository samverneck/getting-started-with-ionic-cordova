angular.module('App')
.config(function($stateProvider) {
  $stateProvider.state('places', {
    url: '/places',
    controller: 'PlacesController as vm',
    templateUrl: 'views/places/places.html'
  });
})
.controller('PlacesController', function($http, $scope, $ionicLoading, $ionicHistory, Geolocation, Types) {
  var vm = this;
  var base = 'https://civinfo-apis.herokuapp.com/civic/places?location=' + Geolocation.geometry.location.lat + ',' + Geolocation.geometry.location.lng;
  var token = '';
  vm.canLoad = true;
  vm.places = [];

  vm.load = function load() {
    $ionicLoading.show();
    var url = base;
    var query = [];
    angular.forEach(Types, function(type) {
      if (type.enabled === true) {
        query.push(type.type.toLowerCase());
      }
    });
    url += '&query=' + query.join('|');

    if (token) {
      url += '&token=' + token;
    }

    $http.get(url).then(function handleResponse(response) {
      vm.places = vm.places.concat(response.data.results);
      token = response.data.next_page_token;

      if (!response.data.next_page_token) {
        vm.canLoad = false;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $ionicLoading.hide();
    });
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    var previous = $ionicHistory.forwardView();
    if (!previous || previous.stateName != 'place') {
      token = '';
      vm.canLoad = false;
      vm.places = [];
      vm.load();
    }
  });
});
