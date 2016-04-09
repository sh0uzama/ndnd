/*globals angular*/
(function() {

  var dependencies = [
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'LocalStorageModule'
  ];

  var ndnd = angular.module('ndnd', dependencies);

  // ndnd.config([
  //   '$mdThemingProvider',
  //   function($mdThemingProvider) {
  //     $mdThemingProvider.theme('default')
  //       .dark();
  //   }
  // ]);

  ndnd.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      //ROOT

      $stateProvider.state('ndnd', {
        url: '/',
        templateUrl: 'client/angular/ctrl/root/rootTmpl.html',
        controller: 'rootCtrl',
        abstract: true,
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
        templateUrl: 'client/angular/ctrl/sheet/sheetTmpl.html',
        controller: 'sheetCtrl',
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