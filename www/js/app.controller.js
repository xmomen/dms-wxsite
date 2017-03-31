/**
 * Created by tanxinzheng on 17/3/31.
 */
define(function(){
  return ['$scope', '$ionicModal', '$http', '$location', '$state', function($scope, $ionicModal, $http, $location, $state){
    $scope.$on('$stateChangePermissionDenied', function(event, toState, toParams, options) {
      console.log("未登录");
      $scope.loginModal.show();
    });
    $scope.back = function(){
      $scope.loginModal.hide();
    };
    $scope.login = function(){
      $http.get('/api/login', {
        params:$scope.user
      }).success(function(data){
        console.log(data);
      })
    };
    $ionicModal.fromTemplateUrl('login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loginModal = modal;
    });
    console.log($location.search());
    //alert($stateParams.openId);
  }]
});
