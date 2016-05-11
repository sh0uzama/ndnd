/*globals angular */
(function(ndnd) {

  ndnd.controller('profileCtrl', [

    '$state', '$mdDialog', 'user', 'heroes',
    function($state, $mdDialog, user, heroes) {

      var ctrl = this;

      ctrl.profile = null;
      ctrl.heroes = [];
      ctrl.addNewHero = addNewHero;
      ctrl.profile = user.profile;
      ctrl.select = selectHero;
      ctrl.delete = deleteHero;
      
      loadHeroes();
      
      function loadHeroes() {
        heroes.fetch().then(data => ctrl.heroes = data);
      }

      function addNewHero() {
        $state.go('ndnd.hero', { id: 'new' });
      }
      
      function selectHero(id) {
        $state.go('ndnd.hero', { id: id });
      }
      
      function deleteHero($index, $event) {
        
        var hero = ctrl.heroes[$index];
        
        var confirm = $mdDialog.confirm()
          .title('Please confirm')
          .textContent(`Would you like to delete ${hero.name}?`)
          .ariaLabel('Confirm delete')
          .targetEvent($event)
          .ok('Please do it!')
          .cancel('I changed my mind');
        
        $mdDialog.show(confirm).then(function() {

          heroes.remove(hero._id).then(function() {
            ctrl.heroes.splice($index, 1);
          });
          
        });
        
      }

    }

  ]);

})(angular.module('ndnd'));