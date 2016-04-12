/*globals angular */
(function(ndnd) {

  ndnd.controller('addNewPerkCtrl', [
    '$mdDialog', 'perks', 'perksToExclude',
    function($mdDialog, perks, perksToExclude) {

      var ctrl = this;

      // filter out perks used by the hero
      var filteredPerks = perks.list.filter(function(p) {
        const found = perksToExclude.find(pte => pte.id === p.id);
        return !found;
      });

      ctrl.perks = angular.copy(filteredPerks);

      ctrl.okEnabled = false;
      ctrl.ok = function() {
        var selectedPerks = ctrl.perks.filter(p => p.selected);
        $mdDialog.hide(selectedPerks);
      };

      ctrl.cancel = function() {
        $mdDialog.cancel();
      };

      ctrl.selectPerk = function(perk, $event) {
        perk.selected = !perk.selected;
        ctrl.okEnabled = ctrl.perks.some(p => p.selected);
        $event.stopPropagation();
      };

    }
  ]);

})(angular.module('ndnd'));