/**
 * Created by tanxinzheng on 17/3/31.
 */
define(function(){
  return ['$scope', '$ionicModal', function($scope, $ionicModal){
    $scope.$on('$stateChangePermissionDenied', function(event, toState, toParams, options) {
      console.log("未登录");
      $scope.loginModal.show();
    });
    $scope.back = function(){
      $scope.loginModal.hide();
    };
    $scope.login = function(){

    };
    $ionicModal.fromTemplateUrl('login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loginModal = modal;
    });
  }]
});
