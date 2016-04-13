/*globals angular*/
(function(ndnd) {

  ndnd.factory('resources', [
    '$q', 'attributes', 'effects', 'energies', 'equipments', 'perks', 'powers', 'skills', 'specializations',
    function($q, attributes, effects, energies, equipments, perks, powers, skills, specializations) {
      
      var promises = [
        attributes.promise,
        effects.promise,
        energies.promise,
        equipments.promise,
        perks.promise,
        powers.promise,
        skills.promise,
        specializations.promise
      ];
      
      var resources = {
        
        attributes: null,
        effects: null,
        energies: null,
        equipments: null,
        perks: null,
        powers: null,
        skills: null,
        specializations: null,
        
        promise: null
        
      };

      function initialize() {
        return $q.all(promises).then(function() {
          resources.attributes = attributes;
          resources.effects = effects;
          resources.energies = energies;
          resources.equipments = equipments;
          resources.perks = perks;
          resources.powers = powers;
          resources.skills = skills;
          resources.specializations = specializations;
        });
      }

      resources.promise = initialize();

      return resources;

    }
  ]);

})(angular.module('ndnd'));