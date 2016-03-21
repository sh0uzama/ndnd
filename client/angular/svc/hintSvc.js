/*globals angular LZString _*/
(function(ndnd) {
  
  class HintHistoryEntry {
    constructor(source, obj) {
      this.source = source;
      this.obj = angular.copy(obj);
    }
  }

  ndnd.controller('hintDialogController', [
    '$mdDialog', 'hint',
    function($mdDialog, hint) {

      var ctrl = this;

      var _hintHistory = [];
      
      function setView() {
        ctrl.hintView = `client/angular/svc/hintSvc-${ctrl.hintSource}.html`;
      }
      
      setView();
      
      function refresh(source, obj) {
        ctrl.hintSource = source;
        ctrl.hintObj = obj;
        setView();
      }

      ctrl.openHint = function(source, id) {
        _hintHistory.push(new HintHistoryEntry(ctrl.hintSource, ctrl.hintObj));
        var obj = hint.getHintObject(source, id);
        refresh(source, obj);
      };

      ctrl.cancel = function() {
        if (_hintHistory.length) {
          var hhe = _hintHistory.pop();
          refresh(hhe.source, hhe.obj);
        }
        else {
          $mdDialog.hide();
        }
      };

    }
  ]);

  ndnd.factory('hint', [
    '$mdDialog', 'effects', 'powers',
    function($mdDialog, effects, powers) {

      function getHintObject(source, id) {

        var obj;

        switch (source) {
          case 'power':
            obj = powers.byId(id);
            break;
          case 'effect':
            obj = effects.byId(id);
            break;
        }

        return obj;

      }

      function openHint(source, id) {

        $mdDialog.show({
          controller: 'hintDialogController',
          controllerAs: 'ctrl',
          templateUrl: 'client/angular/svc/hintSvc.html',
          parent: angular.element(document.body),
          locals: {
            hintSource: source,
            hintObj: getHintObject(source, id)
          },
          bindToController: true,
          clickOutsideToClose: true
        });

      }

      return {
        getHintObject: getHintObject,
        openHint: openHint
      };

    }
  ]);

})(angular.module('ndnd'));