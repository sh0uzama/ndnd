/*globals angular*/
(function(ndnd) {

  ndnd.factory('powers', [
    '$http', '$q', 'htmlifyer',
    function($http, $q, htmlifyer) {

      var powers = {
        list: [],
        promise: null,
        byId: byId
      };

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

      function textToHtml(power) {

        if (power.requirements) {
          power.requirements = htmlifyer.textToHtml(power.requirements);
        }

        if (power.effect) {
          power.effect = htmlifyer.textToHtml(power.effect);
        }

      }

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
          powers.list.forEach(p => {
            p.icon = chooseIcon(p);
            textToHtml(p);
          });

          deferred.resolve(powers.list);

        }, deferred.reject);

        return deferred.promise;

      }

      powers.promise = initialize();

      return powers;

    }
  ]);

})(angular.module('ndnd'));