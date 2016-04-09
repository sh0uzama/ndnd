/*globals angular */
(function(ndnd) {

  ndnd.controller('profileCtrl', [
    
    'api',
    function(api) {
      
      var ctrl = this;
      
      ctrl.profile = null;
      ctrl.heroes = [];

      api.fetchProfile().then(r => ctrl.profile = r.data);
      api.fetchHeroes().then(r => ctrl.heroes = r.data);
      
    }
    
  ]);

})(angular.module('ndnd'));