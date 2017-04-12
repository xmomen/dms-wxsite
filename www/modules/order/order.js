/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'OrderAPI','$state', '$stateParams', '$cookieStore', '$dialog', function($scope, OrderAPI, $state, $stateParams, $cookieStore, $dialog){
    $scope.queryParams = {
      timeType:1
    };
    $scope.getOrders = function(){
      if($scope.queryParams.timeType == 1){
        //近一个月
        $scope.queryParams.minOrderTime = new Date().getTime() - (31 * 24 * 3600000);
        $scope.queryParams.maxOrderTime = new Date().getTime();
      }else if($scope.queryParams.timeType == 2){
        //近半年订单
        $scope.queryParams.minOrderTime = new Date().getTime() - (180 * 24 * 3600000);
        $scope.queryParams.maxOrderTime = new Date().getTime();
      }else if($scope.queryParams.timeType == 3){
        //半年前订单
        $scope.queryParams.minOrderTime = null;
        $scope.queryParams.maxOrderTime = new Date().getTime() - (180 * 24 * 3600000);
      }
      var member = $cookieStore.get('member');
      OrderAPI.query({
        memberId:member.memberId,
        status:$scope.queryParams.status,
        maxOrderTime:$scope.queryParams.maxOrderTime,
        minOrderTime:$scope.queryParams.minOrderTime
      }, function(data){
        $scope.orders = data;
      })
    };

    $scope.switchTime = function(type){
      $scope.queryParams.timeType = type;
      $scope.getOrders();
    };
    $scope.confirm = function(order){
      var member = $cookieStore.get('member');
      OrderAPI.confirm({
        id: order.id,
        memberId:member.memberId
      }, function(){
        $scope.getOrder();
        $dialog.alert("确认收货成功");
      })
    };
    $scope.goPay = function(order){
      $state.go('order_payment', {
        id:order.id
      });
    };
    $scope.cancel = function(order){
      var member = $cookieStore.get('member');
      OrderAPI.cancel({
        id: order.id,
        memberId:member.memberId
      }, function(){
        $scope.getOrder();
        $dialog.alert("已取消该订单");
      })
    };
    $scope.confirmTracking = function(){
      $state.go('tracking');
    };

    var init = function(){
      if($stateParams.type == 0){
        // 全部
        //$scope.queryParams.status = null;
        $scope.titleText = "全部订单";
      }else if($stateParams.type == 1){
        // 待付款
        $scope.queryParams.status = 0;
        $scope.titleText = "待付款订单";
      }else if($stateParams.type == 2){
        // 待收货
        $scope.queryParams.status = 1;
        $scope.titleText = "待收货订单";
      }
      $scope.getOrders();
    };
    init();
  }]
});
