/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'MemberAPI', '$cookieStore', '$dialog', '$stateParams', '$state', function($scope, MemberAPI, $cookieStore, $dialog, $stateParams, $state){
    $scope.account = {};
    $scope.saveLoading = false;
    $scope.save = function(){
      if(!$scope.account || !$scope.account.phoneNumber){
        $dialog.alert('请输入手机号码');
        return;
      }
      if(!(/^1[0-9]{10}$/.test($scope.account.phoneNumber))){
        $dialog.alert('请输入正确格式的手机号码');
        return;
      }
      var member = $cookieStore.get('member');
      $scope.saveLoading = true;
      MemberAPI.update({
        id:member.memberId,
        mobile:$scope.account.phoneNumber
      }, function(data){
        $dialog.alert("保存成功");
      }).$promise.finally(function(){
        $scope.saveLoading = false;
      });
    };
    $scope.getMember = function(){
      var member = $cookieStore.get('member');
      MemberAPI.get({
        id:member.memberId
      }, function(data){
        $scope.account = data;
      });
    };
    $scope.getMember();
  }]
});
