/*globals angular */
(function(ndnd) {

  ndnd.controller('profileCtrl', [
    
    '$state','api',
    function($state, api) {
      
      var ctrl = this;
      
      ctrl.profile = null;
      ctrl.heroes = [];
      ctrl.addNewHero = addNewHero;

      api.fetchProfile().then(data => ctrl.profile = data);
      api.fetchHeroes().then(data => ctrl.heroes = data);
      
      function addNewHero() {
        $state.go('ndnd.newhero');
      }
      
    }
    
  ]);

})(angular.module('ndnd'));