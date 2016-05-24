/*globals angular */
(function(ndnd) {

  ndnd.controller('profileCtrl', [

    '$state', '$mdDialog', 'user', 'heroes', 'sheets',
    function($state, $mdDialog, user, heroes, sheets) {

      var ctrl = this;

      ctrl.heroes = [];
      ctrl.selectedHero = null;
      ctrl.profile = user.profile;

      ctrl.createHero = createHero;
      ctrl.selectHero = selectHero;
      ctrl.deselectHero = deselectHero;
      ctrl.deleteHero = deleteHero;
      ctrl.editHero = editHero;

      ctrl.createSheet = createSheet;
      ctrl.selectSheet = selectSheet;

      loadHeroes();

      function loadHeroes() {
        heroes.fetch().then(data => ctrl.heroes = data);
      }

      function createHero() {
        $state.go('ndnd.hero', {
          id: 'new'
        });
      }

      function selectHero(hero) {
        ctrl.selectedHero = hero;
        loadSheets(hero._id);
      }
      
      function deselectHero() {
        ctrl.selectedHero = null;
      }

      function editHero(hero) {
        $state.go('ndnd.hero', {
          id: hero._id
        });
      }

      function deleteHero(hero, $event) {

        var $index = ctrl.heroes.findIndex(h => h._id === hero._id);

        var confirm = $mdDialog.confirm()
          .title('Please confirm')
          .textContent(`Would you like to delete ${hero.name}?`)
          .ariaLabel('Confirm delete')
          .targetEvent($event)
          .ok('Yeah')
          .cancel('Nope');

        $mdDialog.show(confirm).then(function() {

          ctrl.selectedHero = null;

          heroes.remove(hero._id).then(function() {
            ctrl.heroes.splice($index, 1);
          });

        });

      }

      function loadSheets(heroId) {
        ctrl.sheets = [];
        sheets.fetchByHero(heroId).then(data => ctrl.sheets = data);
      }

      function selectSheet() {

      }

      function createSheet() {

      }

    }

  ]);

})(angular.module('ndnd'));