/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AddressAPI', '$stateParams', function($scope, AddressAPI, $stateParams){
    $scope.getAddressInfo = function(){
      AddressAPI.get({id:$stateParams.id}, function(data){
        $scope.address = data.data;
      });
    };
    $scope.save = function(){

    };
    $scope.delete = function(){

    };
    var init = function(){
      if($stateParams.id){
        $scope.getAddressInfo();
      }
      $scope.getAddressInfo();
    };
    init();
  }]
});
