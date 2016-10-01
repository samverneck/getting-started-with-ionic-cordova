angular.module('App')
.config(function($stateProvider) {
  $stateProvider.state('location', {
    url: '/location',
    controller: 'LocationController as vm',
    templateUrl: 'views/location/location.html'
  });
})
.controller('LocationController', function($ionicLoading, $http, $state, Geolocation, $cordovaGeolocation, $ionicPopup) {
  var vm = this;

vm.useGeolocation = function() {
  $ionicLoading.show();

  $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false}).then(function (position) {
    var lat  = position.coords.latitude;
    var lng = position.coords.longitude;

    var url = 'https://civinfo-apis.herokuapp.com/civic/geolocation?latlng=' + lat + ',' + lng;
    $http.get(url).then(function(response) {
      $ionicLoading.hide();
      if (response.data.results.length) {
        Geolocation.data = response.data.results[0];
        $state.go('places');
      } else {
        $ionicPopup.alert({
          title: 'Unknown location',
          template: 'Please try again or move to another location.'
        });
      }
    })
    .catch(function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Unable to get location',
        template: 'Please try again or move to another location.'
      });
    });
  });
};

});
