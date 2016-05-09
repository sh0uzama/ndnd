/*globals angular */
(function(ndnd) {

  ndnd.controller('profileCtrl', [

    '$state', 'user', 'heroes',
    function($state, user, heroes) {

      var ctrl = this;

      ctrl.profile = null;
      ctrl.heroes = [];
      ctrl.addNewHero = addNewHero;
      ctrl.profile = user.profile;
      ctrl.select = select;
      
      heroes.fetch().then(data => ctrl.heroes = data);

      function addNewHero() {
        $state.go('ndnd.newhero');
      }
      
      function select(id) {
        heroes.fetch(id).then(function(hero) {
          console.log(hero);
        });
      }

    }

  ]);

})(angular.module('ndnd'));