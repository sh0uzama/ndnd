const cdnjs = "//cdnjs.cloudflare.com/ajax/libs"

const versions = {
  angular: "/angular.js/1.5.0",
  angularMaterial: "/angular-material/1.0.6"
};

var jsList = [
  //JQUERY
  cdnjs + "/jquery/3.0.0-beta1/jquery.min.js",
  //LODASH
  cdnjs + "/lodash.js/4.6.1/lodash.min.js",
  //ANGULAR
  cdnjs + versions.angular + "/angular.min.js",
  cdnjs + versions.angular + "/angular-animate.min.js",
  cdnjs + versions.angular + "/angular-aria.min.js",
  cdnjs + versions.angular + "/angular-cookies.min.js",
  cdnjs + versions.angular + "/angular-sanitize.min.js",
  //ANGULAR UI ROUTER
  cdnjs + "/angular-ui-router/0.2.18/angular-ui-router.min.js",
  cdnjs + "/ui-router-extras/0.1.0/ct-ui-router-extras.min.js",
  //ANGULAR MATERIAL
  cdnjs + versions.angularMaterial + "/angular-material.min.js",
  //LOCAL STORAGE
  cdnjs + '/angular-local-storage/0.2.6/angular-local-storage.min.js',
  //LZ-STRING
  cdnjs + '/lz-string/1.4.4/lz-string.min.js'
];

var fontList = [
  "//fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic",
  "//fonts.googleapis.com/icon?family=Material+Icons"
];

var cssList = [
  //ANGULAR MATERIAL
  cdnjs + versions.angularMaterial + "/angular-material.min.css"
];

module.exports = {
  scripts: jsList,
  fonts: fontList,
  styles: cssList
};