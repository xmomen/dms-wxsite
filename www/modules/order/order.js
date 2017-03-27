/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'OrderAPI', function($scope, OrderAPI){
    $scope.getOrders = function(){
      OrderAPI.query({
        memberCode:''
      }, function(data){
        $scope.orders = data;
      })
    };

    $scope.switchTime = function(){

    };
    var init = function(){
      $scope.getOrders();
    };
    init();
  }]
});
