/*globals angular Models _ */
(function(ndnd) {

  const basePath = 'client/angular/ctrl/createNewHero/';

  ndnd.controller('createNewHeroCtrl', [

    '$timeout', 'api', 'attributes', 'specializations', 'skills', 'powers', 'perks', 'dialogService',
    function($timeout, api, attributes, specializations, skills, powers, perks, dialogService) {

      var ctrl = this;
      var hero = new Models.Hero();

      ctrl.currentStepTemplate = null;
      ctrl.hero = hero;

      ctrl.specChange = specChange;
      ctrl.goToStep = goToStep;
      ctrl.changeAttribute = changeAttribute;
      ctrl.changeSkill = changeSkill;
      ctrl.chooseNewPowers = chooseNewPowers;
      ctrl.removePower = removePower;
      ctrl.chooseNewPerks = chooseNewPerks;
      ctrl.removePerk = removePerk;

      ctrl.resources = getResources();

      goToStep(1);

      function getResources() {
        return {
          attributes: attributes.list,
          specializations: specializations.list,
          skills: skills.list,
          powers: powers.list,
          perks: perks.list
        };
      }

      function specChange(idx) {

        if (hero.primarySpec === hero.secondarySpec) {
          if (idx === 1) {
            hero.secondarySpec = null;
          }
          if (idx === 2) {
            hero.primarySpec = null;
          }
        }

      }

      function goToStep(idx) {
        ctrl.currentStepTemplate = basePath + '_step' + idx + '.html';
      }

      function changeAttribute(id, amount) {

        ctrl.hero.attributes[id] += amount;

        if (ctrl.hero.attributes[id] > 3) {
          ctrl.hero.attributes[id] = 3;
        }

        if (ctrl.hero.attributes[id] < 0) {
          ctrl.hero.attributes[id] = 0;
        }

      }

      function changeSkill(id, amount) {

        ctrl.hero.skills[id] += amount;

        if (ctrl.hero.skills[id] > 3) {
          ctrl.hero.skills[id] = 3;
        }

        if (ctrl.hero.skills[id] < -1) {
          ctrl.hero.skills[id] = -1;
        }

      }

      function chooseNewPowers($ev) {

        var alreadySelectedPowers = ctrl.hero.powers;
        var notPertainingPowers = powers.list.filter(p => p.source !== ctrl.hero.primarySpec && p.source !== ctrl.hero.secondarySpec);

        dialogService
          .choosePowersDialog($ev, alreadySelectedPowers.concat(notPertainingPowers))
          .then(addPowers);

        function addPowers(selectedPowers) {
          if (selectedPowers && selectedPowers.length) {
            selectedPowers.forEach(p => {
              ctrl.hero.powers.unshift(powers.byId(p.id));
            });
          }
        }

      }

      function removePower(power, $ev) {

        var idx = _.indexOf(ctrl.hero.powers, power);
        ctrl.hero.powers.splice(idx, 1);

      }

      function chooseNewPerks($ev) {

        dialogService
          .choosePerksDialog($ev, angular.copy(ctrl.hero.perks))
          .then(addPerks);

        function addPerks(selectedPerks) {
          if (selectedPerks && selectedPerks.length) {
            selectedPerks.forEach(p => {
              ctrl.hero.perks.unshift(perks.byId(p.id));
            });
          }
        }

      };

      function removePerk(perk, $ev) {

        var idx = _.indexOf(ctrl.hero.perks, perk);
        ctrl.hero.perk.splice(idx, 1);

      }

    }

  ]);

})(angular.module('ndnd'));