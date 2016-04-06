/*globals angular _*/
(function(ndnd) {

  ndnd.controller('sheetCtrl', [
    '$mdSidenav', '$mdDialog', '$mdToast', 'powers', 'effects', 'character', 'hint', 'key2label',
    function($mdSidenav, $mdDialog, $mdToast, powers, effects, character, hint, key2label) {

      var ctrl = this;

      ctrl.powers = powers.list;
      ctrl.effects = effects.all;
      ctrl.hero = character.hero;
      ctrl.dictionary = key2label.dictionary;

      ctrl.toggleSidenav = function(id) {
        $mdSidenav(id || 'left').toggle();
      };

      ctrl.chooseNewPowers = function($ev) {
        $mdDialog.show({
          controller: 'addNewPowerCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'client/angular/ctrl/addNewPower/addNewPowerTmpl.html',
          parent: angular.element(document.body),
          targetEvent: $ev,
          clickOutsideToClose: true,
          fullscreen: true
        }).then(function() {
          character.persist();
        });
      };
      
      ctrl.chooseNewPerks = function($ev) {
        $mdDialog.show({
          controller: 'addNewPerkCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'client/angular/ctrl/addNewPerk/addNewPerkTmpl.html',
          parent: angular.element(document.body),
          targetEvent: $ev,
          clickOutsideToClose: true,
          fullscreen: true
        }).then(function() {
          character.persist();
        });
      };

      ctrl.removePower = function(power, $ev) {

        var confirm = $mdDialog.confirm()
          .title(`Delete ${power.name}?`)
          .textContent(`Do you want to remove ${power.name} from your list?`)
          .ariaLabel(`Delete ${power.name}?`)
          .targetEvent($ev)
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function() {
          var idx = _.indexOf(ctrl.hero.powers, power);
          ctrl.hero.powers.splice(idx, 1);
          character.persist();
        });

      };
      
      ctrl.removePerk = function(perk, $ev) {

        var confirm = $mdDialog.confirm()
          .title(`Delete ${perk.name}?`)
          .textContent(`Do you want to remove ${perk.name} from your list?`)
          .ariaLabel(`Delete ${perk.name}?`)
          .targetEvent($ev)
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function() {
          var idx = _.indexOf(ctrl.hero.perks, perk);
          ctrl.hero.perks.splice(idx, 1);
          character.persist();
        });

      };
      
      ctrl.usePower = function(power, $evt) {
        
      };

      ctrl.changeWounds = function(amount) {
        ctrl.hero.wounds += amount;
        character.persist();
      };

      ctrl.changeEnergy = function(amount) {
        ctrl.hero.energy += amount;
        character.persist();
      };

      ctrl.changeEffect = function(group, effect) {

        var message;
        var e = effects.byId(effect);

        if (ctrl.hero.effects[group][effect]) {
          delete ctrl.hero.effects[group][effect];
          message = `Removed ${e.name}`;
        }
        else {
          ctrl.hero.effects[group][effect] = 1;
          message = `Added ${e.name}`;
        }

        character.persist();

        // var toast = $mdToast.simple().textContent(message);
        // toast.position = 'top left';

        // $mdToast.show(toast);

      };

      ctrl.switchTurn = function() {

        ctrl.hero.inTurn = !ctrl.hero.inTurn;

        if (ctrl.hero.inTurn) {
          ctrl.hero.hasInstant = true;
        }

        character.persist();

      };

      ctrl.switchInstant = function() {

        ctrl.hero.hasInstant = !ctrl.hero.hasInstant;
        character.persist();

      };

      ctrl.openHint = function(source, id) {
        hint.openHint(source, id);
      };

    }
  ]);

})(angular.module('ndnd'));