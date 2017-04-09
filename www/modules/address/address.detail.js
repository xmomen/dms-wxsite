/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AddressAPI', '$stateParams', '$state', '$dialog', '$cookieStore',
  function($scope, AddressAPI, $stateParams, $state, $dialog, $cookieStore){
    $scope.pageSettingInfo = {
      title:"收货地址"
    };
    $scope.getAddressInfo = function(){
      AddressAPI.get({id:$stateParams.id}, function(data){
        $scope.address = data;
      });
    };
    $scope.addressForm = {};
    $scope.save = function(){
      if($scope.addressForm.validator.form()){
        var member = $cookieStore.get('member');
        $scope.address.cdMemberId = member.memberId;
        if($scope.address.id){
          AddressAPI.update($scope.address, function(data){
            $state.go('address');
          });
        }else{
          AddressAPI.save($scope.address, function(data){
            $state.go('address');
          });
        }
      }
    };
    $scope.delete = function(address){
      $dialog.confirm("是否删除此收货地址？").then(function(){
        AddressAPI.delete({
          id:address.id
        }, function(){
          $dialog.alert("删除成功");
          $state.go('address');
        })
      })
    };
    var init = function(){
      if($stateParams.id){
        $scope.pageSettingInfo.title = "修改收货地址";
        $scope.pageSettingInfo.action = "UPDATE";
        $scope.getAddressInfo();
      }else{
        $scope.address = {};
        $scope.pageSettingInfo.title = "添加收货地址";
        $scope.pageSettingInfo.action = "ADD";
      }
    };
    init();
  }]
});
