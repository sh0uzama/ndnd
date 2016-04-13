/*globals angular*/
(function(ndnd) {

  ndnd.factory('equipments', [
    '$http', '$q',
    function($http, $q) {

      var equipments = {
        list: [],
        promise: null,
        byId: byId
      };

      function byId(id) {
        return equipments.list.find(p => p.id === id);
      }

      function initialize() {

        var deferred = $q.defer();

        var req = {
          url: 'api/equipments',
          method: 'GET'
        };

        $http(req).then(function(result) {

          equipments.list = result.data;
          deferred.resolve(equipments.list);

        }, deferred.reject);

        return deferred.promise;

      }

      equipments.promise = initialize();

      return equipments;

    }
  ]);

})(angular.module('ndnd'));