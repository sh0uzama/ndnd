/*globals angular*/
(function(ndnd) {

  const _energy = [{
    id: 'adrenaline',
    name: 'Adrenaline'
  }, {
    id: 'initiative',
    name: 'Initiative'
  }, {
    id: 'focus',
    name: 'Focus'
  }];

  ndnd.factory('energies', [
    '$http', '$q',
    function($http, $q) {

      var energies = {
        list: [],
        promise: null,
        byId: byId
      };

      function byId(id) {
        return energies.list.find(p => p.id === id);
      }

      function initialize() {
        return $q.when(_energy).then(function(result) {
          energies.list = result;
          return result;
        });

      }

      energies.promise = initialize();

      return energies;

    }
  ]);

})(angular.module('ndnd'));