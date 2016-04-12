/*globals angular Models */
(function(ndnd) {

  const basePath = 'client/angular/ctrl/createNewHero/';

  ndnd.controller('createNewHeroCtrl', [

    '$timeout', 'api', 'attributes', 'specializations', 'skills',
    function($timeout, api, attributes, specializations, skills) {

      var ctrl = this;
      var hero = new Models.Hero();

      ctrl.currentStepTemplate = basePath + '_step1.html';
      ctrl.resources = {
        attributes: attributes.list,
        specializations: specializations.list,
        skills: skills.list
      };
      ctrl.hero = hero;

      ctrl.specChange = specChange;
      ctrl.goToStep = goToStep;
      ctrl.changeAttribute = changeAttribute;
      ctrl.changeSkill = changeSkill;

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

    }

  ]);

})(angular.module('ndnd'));