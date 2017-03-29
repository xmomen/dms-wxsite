/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'OrderAPI','$state', function($scope, OrderAPI, $state){
    $scope.getOrders = function(){
      OrderAPI.query({
        memberCode:''
      }, function(data){
        $scope.orders = data;
      })
    };

    $scope.switchTime = function(){

    };

    $scope.confirmTracking = function(){
      $state.go('tracking');
    };

    var init = function(){
      $scope.getOrders();
    };
    init();
  }]
});
