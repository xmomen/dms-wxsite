/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AddressAPI', function($scope, AddressAPI){
    $scope.getAddressInfo = function(){
      AddressAPI.query({
        pageSize:10,
        pageNum:1
      }, function(data){
        $scope.address = data.data;
      })
    };
    var init = function(){
      $scope.getAddressInfo();
    };
    init();
  }]
});
