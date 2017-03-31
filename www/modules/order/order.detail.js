/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'OrderAPI','$state', '$stateParams', function($scope, OrderAPI, $state, $stateParams){
    $scope.getOrder = function(){
      OrderAPI.get({
        id:$stateParams.id
      }, function(data){
        $scope.order = data;
      })
    };

    $scope.confirmTracking = function(){
      $state.go('tracking', {id:$scope.order.id});
    };

    var init = function(){
      $scope.getOrder();
    };
    init();
  }]
});
