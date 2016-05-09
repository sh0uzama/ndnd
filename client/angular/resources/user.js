/*globals angular*/
(function(ndnd) {

  ndnd.factory('user', [
    '$http', '$q',
    function($http, $q) {

      var user = {
        profile: null,
        promise: null
      };

      function initialize() {

        var deferred = $q.defer();

        var req = {
          url: 'api/profile',
          method: 'GET'
        };

        $http(req).then(function(result) {

          user.profile = result.data;
          deferred.resolve(user);

        }, deferred.reject);

        return deferred.promise;

      }

      user.promise = initialize();

      return user;

    }
  ]);

})(angular.module('ndnd'));