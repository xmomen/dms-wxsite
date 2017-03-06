/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'ProductAPI', function($scope, ProductAPI){
    $scope.getAddressInfo = function(){
      ProductAPI.query({
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
