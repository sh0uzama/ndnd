/*globals angular Models */
(function(ndnd) {

  const basePath = 'client/angular/ctrl/createNewHero/';

  ndnd.controller('createNewHeroCtrl', [

    '$timeout', 'api', 'attributes', 'specializations',
    function($timeout, api, attributes, specializations) {

      var ctrl = this;
      var hero = new Models.Hero();

      ctrl.currentStepTemplate = basePath + '_step1.html';
      ctrl.resources = {
        attributes: attributes.list,
        specializations: specializations.list
      };
      ctrl.hero = hero;

      ctrl.specChange = specChange;
      ctrl.goToStep = goToStep;
      ctrl.changeAttribute = changeAttribute;

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

    }

  ]);

})(angular.module('ndnd'));