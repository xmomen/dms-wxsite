/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'OrderAPI','$state', '$stateParams', '$cookieStore', '$dialog', function($scope, OrderAPI, $state, $stateParams, $cookieStore, $dialog){
    $scope.getOrder = function(){
      OrderAPI.get({
        id:$stateParams.id
      }, function(data){
        $scope.order = data;
      })
    };
    $scope.confirm = function(){
      var member = $cookieStore.get('member');
      OrderAPI.confirm({
        id:$scope.order.id,
        memberId:member.memberId
      }, function(){
        $dialog.alert("确认收货成功");
      })
    };
    $scope.confirm = function(){
      var member = $cookieStore.get('member');
      OrderAPI.confirm({
        id:$scope.order.id,
        memberId:member.memberId
      }, function(){
        $scope.getOrder();
        $dialog.alert("确认收货成功");
      })
    };
    $scope.pay = function(){
      $state.go('order_payment', {
        id:$scope.order.id
      });
    };

    $scope.tracking = function(){
      $state.go('tracking', {id:$scope.order.id});
    };

    var init = function(){
      $scope.getOrder();
    };
    init();
  }]
});
