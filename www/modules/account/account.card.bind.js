/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'CouponAPI', '$cookieStore', '$dialog', function($scope, CouponAPI, $cookieStore, $dialog, $state){
    $scope.coupon = {};
    $scope.activeCard = function () {
      if (!$scope.coupon.number) {
        $dialog.alert('请输入VIP会员卡编号');
        return;
      }
      if (!$scope.coupon.password) {
        $dialog.alert('请输入VIP会员卡密码');
        return;
      }
      var member = $cookieStore.get('member');
      CouponAPI.bindCard({
        couponNumber: $scope.coupon.number,
        password: $scope.coupon.password,
        memberId: member.memberId
      }, function (data) {
        $state.go('account_card');
      });
    };
  }]
});
