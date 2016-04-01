/*globals angular*/
(function(ndnd) {

  ndnd.factory('effects', [
    '$http', '$q', 'htmlifyer',
    function($http, $q, htmlifyer) {

      var _allEffects;
      var effects = {
        all: {},
        list: [],
        promise: null,
        byId: byId
      };

      function textToHtml(obj) {
        if (obj.description) {
          obj.description = htmlifyer.textToHtml(obj.description);
        }
      }

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
          
          effects.all.boons.forEach(textToHtml);
          effects.all.conditions.forEach(textToHtml);
          effects.all.status.forEach(textToHtml);
          
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