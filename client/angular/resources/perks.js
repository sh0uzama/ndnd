/*globals angular*/
(function(ndnd) {

  ndnd.factory('perks', [
    '$http', '$q',
    function($http, $q) {

      var perks = {
        list: [],
        promise: null,
        byId: byId
      };

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
          deferred.resolve(perks.list);

        }, deferred.reject);

        return deferred.promise;

      }

      perks.promise = initialize();

      return perks;

    }
  ]);

})(angular.module('ndnd'));