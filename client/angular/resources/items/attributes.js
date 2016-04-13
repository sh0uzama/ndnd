/*globals angular*/
(function(ndnd) {

  const _attributes = [{
    id: 'strength',
    name: 'Strength'
  }, {
    id: 'agility',
    name: 'Agility'
  }, {
    id: 'willpower',
    name: 'Willpower'
  }, {
    id: 'toughness',
    name: 'Toughness'
  }];

  ndnd.factory('attributes', [
    '$http', '$q',
    function($http, $q) {

      var attributes = {
        list: [],
        promise: null,
        byId: byId
      };

      function byId(id) {
        return attributes.list.find(p => p.id === id);
      }

      function initialize() {
        return $q.when(_attributes).then(function(result) {
          attributes.list = result;
          return result;
        });
      }

      attributes.promise = initialize();

      return attributes;

    }
  ]);

})(angular.module('ndnd'));