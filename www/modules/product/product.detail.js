/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'ProductAPI', '$stateParams', function($scope, ProductAPI, $stateParams){
    $scope.getAddressInfo = function(){
      ProductAPI.get({id:$stateParams.id}, function(data){
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
