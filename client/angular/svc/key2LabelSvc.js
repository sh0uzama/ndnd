/*globals angular */
(function(ndnd) {

  ndnd.factory('key2label', [
    'effects', 'powers',
    function(effects, powers) {
      
      var dictionary = {
        strength: "Strength",
        agility: "Agility",
        willpower: "Willpower",
        toughness: "Toughness",
        maxWounds: "Wounds (Max)",
        permanentWounds: "Perm. Wounds",
        armor: "Armor",
        movement: "Movement Speed"
      };
      
      effects.list.forEach(e => dictionary[e.id] = e.name);
      powers.list.forEach(p => dictionary[p.id] = p.name);
      
      return {
        dictionary: dictionary
      };

    }
  ]);

})(angular.module('ndnd'));