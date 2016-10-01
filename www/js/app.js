angular.module('App', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Geolocation', function() {
  return {
    data: {}
  };
})

.factory('Types', function() {
  return [
    {type: 'Park', enabled: true},
    {type: 'Hospital', enabled: true},
    {type: 'Library', enabled: true},
    {type: 'Museum', enabled: true}
  ];
})

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/location');
})
