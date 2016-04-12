/*globals angular _*/
(function(ndnd) {

  ndnd.controller('sheetCtrl', [
    '$mdDialog', '$mdToast', 'powers', 'perks', 'effects', 'character', 'hint', 'key2label', 'dialogService',
    function($mdDialog, $mdToast, powers, perks, effects, character, hint, key2label, dialogService) {

      var ctrl = this;

      ctrl.powers = powers.list;
      ctrl.effects = effects.all;
      ctrl.hero = character.hero;
      ctrl.dictionary = key2label.dictionary;

      ctrl.chooseNewPowers = function($ev) {
        
        dialogService
          .choosePowersDialog($ev, angular.copy(ctrl.hero.powers))
          .then(addPowersAndPersist);

        function addPowersAndPersist(selectedPowers) {
          if (selectedPowers && selectedPowers.length) {
            selectedPowers.forEach(p => {
              ctrl.hero.powers.unshift(powers.byId(p.id));
            });
            character.persist();
          }
        }

      };

      ctrl.chooseNewPerks = function($ev) {
        dialogService
          .choosePerksDialog($ev, angular.copy(ctrl.hero.perks))
          .then(addPerksAndPersist);

        function addPerksAndPersist(selectedPerks) {
          if (selectedPerks && selectedPerks.length) {
            selectedPerks.forEach(p => {
              ctrl.hero.perks.unshift(perks.byId(p.id));
            });
            character.persist();
          }
        }

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

        if (ctrl.hero.effects[group][effect]) {
          delete ctrl.hero.effects[group][effect];
        }
        else {
          ctrl.hero.effects[group][effect] = 1;
        }

        character.persist();

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