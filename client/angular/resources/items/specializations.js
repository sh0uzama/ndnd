/*globals angular*/
(function(ndnd) {

  const _specializations = [{
    id: 'arms',
    name: 'Arms'
  }, {
    id: 'shadow-arts',
    name: 'Shadow Arts'
  }, {
    id: 'elemental-magic',
    name: 'Elemental Magic'
  }];

  ndnd.factory('specializations', [
    '$http', '$q',
    function($http, $q) {

      var specializations = {
        list: [],
        promise: null,
        byId: byId
      };

      function byId(id) {
        return specializations.list.find(p => p.id === id);
      }

      function initialize() {
        return $q.when(_specializations).then(function(result) {
          specializations.list = result;
          return result;
        });

      }

      specializations.promise = initialize();

      return specializations;

    }
  ]);

})(angular.module('ndnd'));