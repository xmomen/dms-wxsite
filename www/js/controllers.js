angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ProductsCtrl', function($scope) {})

  .controller('ProductCtrl', function($scope) {})

  .controller('CartCtrl', function($scope) {})

  .controller('CartsCtrl', function($scope) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
