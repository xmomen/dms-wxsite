/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AddressAPI', '$stateParams', function($scope, AddressAPI, $stateParams){
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
        AddressAPI.save($scope.address, function(){

        });
      }
    };
    $scope.delete = function(){

    };
    var init = function(){
      if($stateParams.id){
        $scope.pageSettingInfo.title = "修改收货地址";
        $scope.pageSettingInfo.action = "UPDATE";
        $scope.getAddressInfo();
      }else{
        $scope.pageSettingInfo.title = "添加收货地址";
        $scope.pageSettingInfo.action = "ADD";
      }
    };
    init();
  }]
});
