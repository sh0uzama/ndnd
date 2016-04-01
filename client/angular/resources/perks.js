/*globals angular*/
(function(ndnd) {

  ndnd.factory('perks', [
    '$http', '$q', 'htmlifyer',
    function($http, $q, htmlifyer) {

      var perks = {
        list: [],
        promise: null,
        byId: byId
      };

      function textToHtml(p) {

        if (p.requirements) {
          p.requirements = htmlifyer.textToHtml(p.requirements);
        }

        if (p.effect) {
          p.effect = htmlifyer.textToHtml(p.effect);
        }

      }

      function byId(id) {
        return perks.list.find(p => p.id === id);
      }

      function initialize() {

        var deferred = $q.defer();

        var req = {
          url: 'api/perks',
          method: 'GET'
        };

        $http(req).then(function(result) {

          perks.list = result.data;
          perks.list.forEach(textToHtml);
          deferred.resolve(perks.list);

        }, deferred.reject);

        return deferred.promise;

      }

      perks.promise = initialize();

      return perks;

    }
  ]);

})(angular.module('ndnd'));