var hintRegex = /\{.*?\}/g;
var newlineRegex = /(?:\r\n|\r|\n)/g;

function hintToHtml(hint) {

  hint = hint.substring(1, hint.length - 1);
  var pieces = hint.split(':');

  if (pieces.length == 2) {
    pieces.push(pieces[1]);
  }

  return `<a href="#" ng-click="ctrl.openHint('${pieces[0]}','${pieces[1]}')">${pieces[2]}</a>`;
}

function textToHtml(aString) {
  
  var result = String(aString).replace(newlineRegex, '<br />');
  result = result.replace(hintRegex, hintToHtml);
  return result;

}

module.exports = {
  textToHtml: textToHtml
};