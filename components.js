const cdnjs = "//cdnjs.cloudflare.com/ajax/libs"

const versions = {
  angular: "/angular.js/1.5.3",
  angularMaterial: "/angular-material/1.0.7"
};

var jsList = [
  //LODASH
  cdnjs + "/lodash.js/4.8.2/lodash.min.js",
  //ANGULAR
  cdnjs + versions.angular + "/angular.min.js",
  cdnjs + versions.angular + "/angular-animate.min.js",
  cdnjs + versions.angular + "/angular-aria.min.js",
  cdnjs + versions.angular + "/angular-cookies.min.js",
  cdnjs + versions.angular + "/angular-sanitize.min.js",
  //ANGULAR UI ROUTER
  cdnjs + "/angular-ui-router/0.2.18/angular-ui-router.min.js",
  cdnjs + "/ui-router-extras/0.1.2/ct-ui-router-extras.min.js",
  //ANGULAR MATERIAL
  cdnjs + versions.angularMaterial + "/angular-material.min.js",
  //LOCAL STORAGE
  cdnjs + '/angular-local-storage/0.2.7/angular-local-storage.min.js',
  //LZ-STRING
  cdnjs + '/lz-string/1.4.4/lz-string.min.js',
  //ANGULAR SCHEMA FORM
  cdnjs + '/angular-schema-form/0.8.13/schema-form.min.js',
  cdnjs + '/angular-schema-form/0.8.13/bootstrap-decorator.min.js'
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