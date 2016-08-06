angular.module('App')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('settings', {
    url: '/settings',
    abstract: true,
    templateUrl: 'views/settings/settings.html'
  })
  .state('settings.about', {
    url: '/about',
    views: {
      about: {
        templateUrl: 'views/settings/tab.about.html'
      }
    }
  })
  .state('settings.license', {
    url: '/license',
    views: {
      about: {
        templateUrl: 'views/settings/tab.license.html'
      }
    }
  })
  .state('settings.preferences', {
    url: '/preferences',
    views: {
      preferences: {
        controller: 'PreferencesController',
        controllerAs: 'vm',
        templateUrl: 'views/settings/tab.preferences.html'
      }
    }
  });

  $urlRouterProvider.when('/settings', '/settings/preferences');
})
.controller('PreferencesController', function(Types) {
  var vm = this;

  vm.types = Types;
});
