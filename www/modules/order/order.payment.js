/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function () {
  return ['$scope', 'OrderAPI', '$state', '$stateParams', '$dialog', '$ionicModal', 'CouponAPI', '$cookieStore', '$filter',
    function ($scope, OrderAPI, $state, $stateParams, $dialog, $ionicModal, CouponAPI, $cookieStore, $filter) {
      $scope.getOrder = function () {
        OrderAPI.get({
          id: $stateParams.id
        }, function (data) {
          $scope.order = data;
        })
      };
      $scope.payment = {};
      $ionicModal.fromTemplateUrl('chose-card.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.cardModal = modal;
      });
      $ionicModal.fromTemplateUrl('add-card.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.addCardModal = modal;
      });
      $scope.openCardModel = function () {
        $scope.cardModal.show();
        $scope.queryCard();
      };
      $scope.openAddCard = function () {
        $scope.addCardModal.show();
      };
      $scope.closeAddCard = function () {
        $scope.addCardModal.hide();
      };
      $scope.coupon = {};
      $scope.activeCard = function () {
        if (!$scope.coupon.number) {
          $dialog.alert('请输入购物卡编号');
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
          $scope.closeAddCard();
          $scope.queryCard();
        });
      };
      $scope.choseCoupon = function (item) {
        $scope.payment.card = item;
        $scope.payment.paymentNo = item.couponNumber;
        $scope.changePayText();
        $scope.cardModal.hide();
      };
      $scope.showCardInfo = function () {
        if (!$scope.payment.paymentNo) {
          return '请选择';
        }
        return '卡号：' + $scope.payment.paymentNo + ', 余额：' + $filter('currency')($scope.payment.card.userPrice);
      };
      $scope.closeCouponModal = function () {
        $scope.cardModal.hide();
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
      $scope.cardPay = function () {
        if (!$scope.payment.paymentNo) {
          $dialog.alert('请选择购物卡');
          return;
        }
        var member = $cookieStore.get('member');
        OrderAPI.pay({
          orderId: $scope.payment.orderId,
          paymentNo: $scope.payment.paymentNo
        }, function () {
          $dialog.alert("付款成功");
          $state.go('order', {type: 0});
        })
      };
      $scope.isActiveBtn = function(){
        if($scope.order && $scope.payment.card && $scope.order.totalAmount <= $scope.payment.card.userPrice){
          return false;
        }
        return true;
      };
      $scope.payText = '请选择购物卡付款';
      $scope.changePayText = function(){
        if(!$scope.payment.card){
          $scope.payText = "请选择购物卡付款";
          return;
        }
        if($scope.order.totalAmount <= $scope.payment.card.userPrice){
          $scope.payText = '付款金额：￥ ' + $scope.order.totalAmount;
          return;
        }else{
          $scope.payText = '付款金额：￥ ' + $scope.order.totalAmount + '，卡内余额不足';
        }
      };
      var init = function () {
        if ($stateParams.id) {
          $scope.payment.orderId = $stateParams.id;
          $scope.getOrder();
        }
      };
      init();
    }]
});
