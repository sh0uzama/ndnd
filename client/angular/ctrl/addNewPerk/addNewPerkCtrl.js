/*globals angular _*/
(function(ndnd) {

  ndnd.controller('addNewPerkCtrl', [
    '$mdDialog', 'perks', 'character',
    function($mdDialog, perks, character) {

      var ctrl = this;

      ctrl.hero = character.hero;

      // filter out perks used by the hero
      var filteredPerks = _.difference(perks.list, ctrl.hero.perks, p => p.id);
      ctrl.perks = angular.copy(filteredPerks);

      ctrl.okEnabled = false;
      ctrl.ok = function() {
        var selectedPerks = ctrl.perks.filter(p => p.selected);
        selectedPerks.forEach(p => {
          ctrl.hero.perks.unshift(perks.byId(p.id));
        });
        $mdDialog.hide();
      };

      ctrl.cancel = function() {
        $mdDialog.hide();
      };
      
      ctrl.selectPerk = function(perk, $event) {
        perk.selected = !perk.selected;
        ctrl.okEnabled = ctrl.perks.some(p => p.selected);
        $event.stopPropagation();
      };

    }
  ]);

})(angular.module('ndnd'));