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
      
      $stateProvider.state('ndnd', {
        url: '/',
        template: '<ui-view layout="row" flex></ui-view>',
        resolve: {
          _powers: function(powers) {
            return powers.promise;
          },
          _effects: function(effects) {
            return effects.promise;
          },
          _perks: function(perks) {
            return perks.promise;
          }
        }
      });
      
      $stateProvider.state('ndnd.character', {
        url: 'character',
        templateUrl: 'client/angular/ctrl/root/rootTmpl.html',
        controller: 'rootCtrl',
        controllerAs: 'ctrl'
      });

      $urlRouterProvider.otherwise('/character');
    }
  ]);

  ndnd.config([
    'localStorageServiceProvider',
    function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('ndnd');
    }
  ]);

})();