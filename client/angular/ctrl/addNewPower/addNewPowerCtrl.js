/*globals angular _*/
(function(ndnd) {

  ndnd.controller('addNewPowerCtrl', [
    '$mdDialog', 'powers', 'character',
    function($mdDialog, powers, character) {

      var ctrl = this;

      ctrl.hero = character.hero;

      // filter out powers used by the hero
      var filteredPowers = _.difference(powers.list, ctrl.hero.powers, p => p.id);
      ctrl.powers = angular.copy(filteredPowers);

      ctrl.okEnabled = false;
      ctrl.ok = function() {
        var selectedPowers = ctrl.powers.filter(p => p.selected);
        selectedPowers.forEach(p => {
          ctrl.hero.powers.unshift(powers.byId(p.id));
        });
        $mdDialog.hide();
      };

      ctrl.cancel = function() {
        $mdDialog.hide();
      };
      
      ctrl.selectPower = function(power, $event) {
        power.selected = !power.selected;
        ctrl.okEnabled = ctrl.powers.some(p => p.selected);
        $event.stopPropagation();
      };

    }
  ]);

})(angular.module('ndnd'));