/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'GoodsAPI', '$stateParams', function($scope, GoodsAPI, $stateParams){
    $scope.getGoodsInfo = function(){
      GoodsAPI.get({id:$stateParams.id}, function(data){
      });
    };
    $scope.save = function(){

    };
    $scope.delete = function(){

    };
    var init = function(){
      if($stateParams.id){
        $scope.getGoodsInfo();
      }
      $scope.getGoodsInfo();
    };
    init();
  }]
});
