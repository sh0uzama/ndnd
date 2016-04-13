/*globals angular*/
(function(ndnd) {

  const _skills = [{
    id: 'arcana',
    name: 'Arcana'
  }, {
    id: 'athletics',
    name: 'Athletics'
  }, {
    id: 'lore',
    name: 'Lore'
  }, {
    id: 'perception',
    name: 'Perception'
  }, {
    id: 'stealth',
    name: 'Stealth'
  }, {
    id: 'survival',
    name: 'Survival'
  }, {
    id: 'thievery',
    name: 'Thievery'
  }, {
    id: 'wits',
    name: 'Wits'
  }];

  ndnd.factory('skills', [
    '$http', '$q',
    function($http, $q) {

      var skills = {
        list: [],
        promise: null,
        byId: byId
      };

      function byId(id) {
        return skills.list.find(p => p.id === id);
      }

      function initialize() {
        return $q.when(_skills).then(function(result) {
          skills.list = result;
          return result;
        });
      }

      skills.promise = initialize();

      return skills;

    }
  ]);

})(angular.module('ndnd'));