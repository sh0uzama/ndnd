/*globals angular LZString _*/
(function(ndnd) {

  ndnd.factory('htmlifyer', [
    
    function() {

      var hintRegex = /\{.*?\}/g;
      var newlineRegex = /(?:\r\n|\r|\n)/g;

      function hintToHtml(hint) {

        hint = hint.substring(1, hint.length - 1);
        var pieces = hint.split(':');

        if (pieces.length == 2) {
          var label = pieces[1];
          label = label.charAt(0).toUpperCase() + label.slice(1);
          pieces.push(label);
        }

        return `<a class="hint-link" ng-click="ctrl.openHint('${pieces[0]}','${pieces[1]}')">${pieces[2]}</a>`;
      }

      function textToHtml(aString) {

        var result = String(aString).replace(newlineRegex, '<br />');
        result = result.replace(hintRegex, hintToHtml);
        return result;

      }

      return {
        textToHtml: textToHtml
      };
    }
    
  ]);

})(angular.module('ndnd'));