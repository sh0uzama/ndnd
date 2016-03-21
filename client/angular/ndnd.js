/*globals angular*/
(function() {

  var dependencies = [
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'LocalStorageModule'
  ];

  var ndnd = angular.module('ndnd', dependencies);

  ndnd.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      //ROOT
      $stateProvider
        .state('ndnd', {
          url: '/',
          templateUrl: 'client/angular/ctrl/root/rootTmpl.html',
          controller: 'rootCtrl',
          controllerAs: 'ctrl',
          resolve: {
            _powers: function(powers) { return powers.promise; },
            _effects: function(effects) { return effects.promise; },
          }
        });

      $urlRouterProvider.otherwise('/');
    }
  ]);

  ndnd.config([
    'localStorageServiceProvider',
    function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('ndnd');
    }
  ]);

})();