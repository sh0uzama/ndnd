/*globals angular */
(function(ndnd) {

  ndnd.controller('rootCtrl', [
    '$scope','$mdSidenav',
    function($scope, $mdSidenav) {
      
      $scope.toggleSidenav = function() {
        console.log('text');
        $mdSidenav('left').toggle();
      };
      
    }
  ]);

})(angular.module('ndnd'));