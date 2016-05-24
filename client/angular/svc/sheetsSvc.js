/*globals angular Models*/
(function(ndnd) {

  ndnd.factory('sheets', [

    '$q', '$http', 'user', 'resources',
    function($q, $http, user, resources) {

      const _rootUrl = 'api/sheets';

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

        fetchByHero(heroId) {

          return $http.get(_rootUrl + '/hero/' + heroId).then(function(response) {
            if (response.data) {
              return response.data.map(toObject);
            }
            return [];
          });

        }

        save(obj) {

          var model = toModel(obj);

          if (obj._id) {

            return $http.put(_rootUrl + '/' + obj._id, model).then(function(response) {
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

        toModel(sheet) {
          return toModel(sheet);
        }

        toObject(sheet) {
          return toObject(sheet);
        }
        
        createNewFromHero(hero) {
          
          var sheet = new Models.Sheet();
          
          sheet.heroId = hero._id;
          sheet.name = hero.name + " - sheet";
          sheet.wounds = 12 + hero.attributes.strength + (hero.attributes.toughness * 2);
          
          return sheet;

        }

      }

      function toModel(sheet) {

        var model = angular.copy(sheet);
        model.userId = user.profile._id;
        return model;

      }

      function toObject(model) {

        var sheet = new Models.Sheet();
        sheet = angular.merge(sheet, model);
        return sheet;

      }

      var api = new Api();

      return api;

    }

  ]);

})(angular.module('ndnd'));