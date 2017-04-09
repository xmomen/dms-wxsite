/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'OrderAPI','$state', '$stateParams', function($scope, OrderAPI, $state, $stateParams){
    $scope.coupon = {};
    $scope.getCouponProduct = function(){
      OrderAPI.getCouponProduct({
        couponNo:$scope.coupon.number
      }, function(data){
        //$scope.products = data;
        $state.go('payment_confirm', {
          products:data,
          couponNo:$scope.coupon.number
        });
      })
    };

    var init = function(){
    };
    init();
  }]
});
