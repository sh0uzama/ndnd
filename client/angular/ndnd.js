/*globals angular*/
(function() {

  var dependencies = [
    'ngSanitize',
    'ngMessages',
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
          },
          _attributes: function(attributes) {
            return attributes.promise;
          },
          _specializations: function(specializations) {
            return specializations.promise;
          },
          _skills: function(skills) {
            return skills.promise;
          },
          _energies: function(energies) {
            return energies.promise;
          },
          _resources: function(resources) {
            return resources.promise;
          },
          _user: function(user) {
            return user.promise;
          }
        }
      });

      $stateProvider.state('ndnd.sheet', {
        url: 'sheet',
        templateUrl: 'client/angular/ctrl/sheet/sheetTmpl.html',
        controller: 'sheetCtrl',
        controllerAs: 'ctrl',
        sectionClass: 'section-sheet'
      });

      $stateProvider.state('ndnd.profile', {
        url: 'profile',
        templateUrl: 'client/angular/ctrl/profile/profileTmpl.html',
        controller: 'profileCtrl',
        controllerAs: 'ctrl',
        sectionClass: 'section-profile'
      });

      $stateProvider.state('ndnd.hero', {
        url: 'hero/:id',
        templateUrl: 'client/angular/ctrl/hero/heroEditTmpl.html',
        controller: 'heroEditCtrl',
        controllerAs: 'ctrl',
        sectionClass: 'section-hero'
      });

      $urlRouterProvider.otherwise('/profile');
      
    }
  ]);

  ndnd.config([
    'localStorageServiceProvider',
    function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('ndnd');
    }
  ]);

  ndnd.run([
    '$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
      // It's very handy to add references to $state and $stateParams to the $rootScope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]);

})();