/*globals angular*/
(function(ndnd) {

  ndnd.factory('api', [

    '$q', '$http',
    function($q, $http) {

      const _rootUrl = 'api';
      const _get = function(url) {
        return $http.get(_rootUrl + url).then(function(response) {
          return response.data;
        });
      };

      class Api {

        constructor() {}

        fetchProfile() {
          return _get('/profile');
        }

      }

      var api = new Api();

      return api;

    }

  ]);

})(angular.module('ndnd'));