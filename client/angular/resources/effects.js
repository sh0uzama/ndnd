/*globals angular*/
(function(ndnd) {

  ndnd.factory('effects', [
    '$http', '$q',
    function($http, $q) {

      var _allEffects;
      var effects = {
        all: {},
        list: [],
        promise: null,
        byId: byId
      };

      function byId(id) {
        return _allEffects.find(p => p.id === id);
      }

      function initialize() {

        var deferred = $q.defer();

        var req = {
          url: 'api/effects',
          method: 'GET'
        };

        $http(req).then(function(result) {

          _allEffects = [];
          effects.all = result.data;
          _allEffects = _allEffects.concat(effects.all.boons);
          _allEffects = _allEffects.concat(effects.all.conditions);
          _allEffects = _allEffects.concat(effects.all.status);
          
          _allEffects.forEach(e => e.icon = `effects/${e.id}`);
          
          effects.list = _allEffects;

          deferred.resolve(effects.all);

        }, deferred.reject);

        return deferred.promise;

      }

      effects.promise = initialize();

      return effects;

    }
  ]);

})(angular.module('ndnd'));