/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'OrderAPI','$state', '$stateParams', '$dialog', function($scope, OrderAPI, $state, $stateParams, $dialog){
    $scope.coupon = {};
    $scope.getCouponProduct = function(){
      if(!$scope.coupon.number){
        $dialog.alert('请输入券号');
        return;
      }
      OrderAPI.getCouponProduct({
        couponNo:$scope.coupon.number
      }, function(data){
        //$scope.products = data;
        $state.go('payment_confirm', {
          products:data,
          couponNo:$scope.coupon.number
        });
      });
    };

    var init = function(){
    };
    init();
  }]
});
