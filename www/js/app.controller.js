/**
 * Created by tanxinzheng on 17/3/31.
 */
define(function(){
  return ['$scope', '$ionicModal', '$http', '$location', '$state', '$UrlUtils', '$cookieStore', 'BindAPI', '$urlRouter','$dialog','PermPermissionStore',
  function($scope, $ionicModal, $http, $location, $state, $UrlUtils, $cookieStore, BindAPI, $urlRouter, $dialog, PermPermissionStore){
    $scope.$on('$stateChangePermissionDenied', function(event, toState, toParams, options) {
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
      if(!$scope.user.phone){
        $dialog.alert('请输入手机号');
        return;
      }
      if(!$scope.user.name){
        $dialog.alert('请输入姓名');
        return;
      }
      var member = $cookieStore.get('member');
      BindAPI.bindMember({
        openId:member.openId,
        name:$scope.user.name,
        memberId:member.memberId,
        mobile:$scope.user.phone
      }, function(data){
        $urlRouter.sync();
        $urlRouter.listen();
        $cookieStore.put('member', {
          memberId:data.id,
          openId:member.openId
        });
        PermPermissionStore
          .definePermission('isAuthorized', function () {
            return true;
          });
        $scope.loginModal.hide();
      })
    };
    $ionicModal.fromTemplateUrl('login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loginModal = modal;
      var member = $cookieStore.get('member');
      if(!member.memberId){
        $scope.loginModal.show();
      }
    });

  }]
});
