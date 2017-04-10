/**
 * Created by tanxinzheng on 17/3/31.
 */
define(function(){
  return ['$scope', '$ionicModal', '$http', '$location', '$state', '$UrlUtils', '$cookieStore', 'BindAPI', '$urlRouter',
  function($scope, $ionicModal, $http, $location, $state, $UrlUtils, $cookieStore, BindAPI, $urlRouter){
    $scope.$on('$stateChangePermissionDenied', function(event, toState, toParams, options) {
      console.log("未登录");
      $scope.loginModal.show();
    });
    $scope.user = {};
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
    $scope.bind = function(){
      var member = $cookieStore.get('member');
      BindAPI.bindMember({
        openId:member.openId,
        mobile:$scope.user.phone
      }, function(data){
        $scope.loginModal.hide();
        $urlRouter.sync();
        $urlRouter.listen();
        $cookieStore.put('member', {
          memberId:data.id,
          openId:member.openId
        });
      })
    };
    $ionicModal.fromTemplateUrl('login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loginModal = modal;
    });
    var params = {
      openId:$UrlUtils.getParams('openId'),
      memberId:$UrlUtils.getParams('memberId')
    };
    console.log(params);
  }]
});
