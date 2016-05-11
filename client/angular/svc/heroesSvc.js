/*globals angular Models*/
(function(ndnd) {

  ndnd.factory('heroes', [

    '$q', '$http', 'user', 'resources',
    function($q, $http, user, resources) {

      const _rootUrl = 'api/heroes';

      class Api {

        constructor() {}

        fetch(id) {

          if (id) {

            return $http.get(_rootUrl + '/' + id).then(function(response) {
              return toObject(response.data);
            });

          }
          else {

            return $http.get(_rootUrl).then(function(response) {
              if (response.data) {
                return response.data.map(toObject);
              }
              return [];
            });

          }

        }

        save(hero) {
          
          var model = toModel(hero);

          if (hero._id) {
            
            return $http.put(_rootUrl + '/' + hero._id, model).then(function(response) {
              return toObject(response.data);
            });
            
          }
          else {
            
            return $http.post(_rootUrl, model).then(function(response) {
              return toObject(response.data);
            });
            
          }


        }

        remove(id) {

          return $http.delete(_rootUrl + '/' + id).then(function(response) {
            return toObject(response.data);
          });

        }

      }
      
      function flattenArray(sourceArray, fieldName = "id") {
        return sourceArray.map(item => item[fieldName]);
      }
      
      function inflateArray(sourceArray, resourceName) {
        return sourceArray.map(item => resources[resourceName].byId(item));
      }

      function toModel(hero) {
        
        var model = angular.copy(hero);
        model.userId = user.profile._id;
        model.powers = flattenArray(hero.powers);
        model.perks = flattenArray(hero.perks);
        model.wieldables = flattenArray(hero.wieldables);
        model.armor = hero.armor.id;
        return model;

      }
      
      function toObject(model) {
        
        var hero = new Models.Hero();
        hero = angular.merge(hero, model);
        hero.powers = inflateArray(model.powers, "powers");
        hero.perks = inflateArray(model.perks, "perks");
        hero.wieldables = inflateArray(model.wieldables, "equipments");
        hero.armor = resources.equipments.byId(model.armor);
        return hero;
        
      }

      var api = new Api();

      return api;

    }

  ]);

})(angular.module('ndnd'));