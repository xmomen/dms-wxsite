/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'CouponAPI', '$cookieStore', '$dialog', function($scope, CouponAPI, $cookieStore, $dialog){
    $scope.coupon = {};
    $scope.activeCard = function () {
      if (!$scope.coupon.number) {
        $dialog.alert('请输入购物卡编号');
        return;
      }
      var member = $cookieStore.get('member');
      CouponAPI.bindCard({
        couponNumber: $scope.coupon.number,
        memberId: member.memberId
      }, function (data) {
        $scope.queryCard();
      });
    };
    $scope.queryCard = function () {
      var member = $cookieStore.get('member');
      CouponAPI.query({
        memberId: member.memberId,
        couponType: 1
      }, function (data) {
        $scope.coupons = data;
      });
    };
    var init = function(){
      $scope.getAccountInfo();
    };
    init();
  }]
});
