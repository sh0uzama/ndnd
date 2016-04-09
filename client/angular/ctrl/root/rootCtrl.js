/*globals angular */
(function(ndnd) {

  ndnd.controller('rootCtrl', [
    '$rootScope', '$scope', '$mdSidenav',
    function($rootScope, $scope, $mdSidenav) {

      $scope.toggleSidenav = function() {
        $mdSidenav('left').toggle();
      };
      
    }
  ]);

})(angular.module('ndnd'));