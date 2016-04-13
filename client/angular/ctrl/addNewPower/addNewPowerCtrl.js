/*globals angular */
(function(ndnd) {

  ndnd.controller('addNewPowerCtrl', [
    '$mdDialog', 'powers', 'powersToExclude',
    function($mdDialog, powers, powersToExclude) {

      var ctrl = this;

      // filter out powers already selected
      var filteredPowers = powers.list.filter(function(p) {
        const found = powersToExclude.find(pte => pte.id === p.id);
        return !found;
      });
      
      ctrl.powers = angular.copy(filteredPowers);
      
      console.log(ctrl.powers);

      ctrl.okEnabled = false;
      ctrl.ok = function() {
        var selectedPowers = ctrl.powers.filter(p => p.selected);
        $mdDialog.hide(selectedPowers);
      };

      ctrl.cancel = function() {
        $mdDialog.cancel();
      };
      
      ctrl.selectPower = function(power, $event) {
        power.selected = !power.selected;
        ctrl.okEnabled = ctrl.powers.some(p => p.selected);
        $event.stopPropagation();
      };

    }
  ]);

})(angular.module('ndnd'));