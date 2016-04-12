/*globals angular */
(function(ndnd) {

  ndnd.factory('dialogService', [
    '$mdDialog',
    function($mdDialog) {

      function choosePowersDialog($ev, powersToExclude) {
        return $mdDialog.show({
          controller: 'addNewPowerCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'client/angular/ctrl/addNewPower/addNewPowerTmpl.html',
          parent: angular.element(document.body),
          targetEvent: $ev,
          clickOutsideToClose: true,
          fullscreen: true,
          locals: {
            powersToExclude: powersToExclude
          }
        });
      }

      function choosePerksDialog($ev, perksToExclude) {
        return $mdDialog.show({
          controller: 'addNewPerkCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'client/angular/ctrl/addNewPerk/addNewPerkTmpl.html',
          parent: angular.element(document.body),
          targetEvent: $ev,
          clickOutsideToClose: true,
          fullscreen: true,
          locals: {
            perksToExclude: perksToExclude
          }
        });
      }

      return {
        choosePowersDialog: choosePowersDialog,
        choosePerksDialog: choosePerksDialog
      };

    }
  ]);

})(angular.module('ndnd'));