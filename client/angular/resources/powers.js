/*globals angular*/
(function(ndnd) {

  function chooseIcon(power) {

    switch (power.source) {
      case 'arms':
        return 'battle-axe';
      case 'elemental-magic':
        return 'frostfire';
      case 'shadow-arts':
        return 'domino-mask';
    }

    return 'private';

  }


  ndnd.factory('powers', [
    '$http', '$q',
    function($http, $q) {

      var powers = {
        list: [],
        promise: null,
        byId: byId
      };

      function byId(id) {
        return powers.list.find(p => p.id === id);
      }

      function initialize() {

        var deferred = $q.defer();

        var req = {
          url: 'api/powers',
          method: 'GET'
        };

        $http(req).then(function(result) {

          powers.list = result.data;
          powers.list.forEach(p => p.icon = chooseIcon(p));

          deferred.resolve(powers.list);

        }, deferred.reject);

        return deferred.promise;

      }

      powers.promise = initialize();

      return powers;

    }
  ]);

})(angular.module('ndnd'));