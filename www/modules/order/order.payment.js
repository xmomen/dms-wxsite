/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function () {
  return ['$scope', 'OrderAPI', '$state', '$stateParams', '$dialog', '$ionicModal', 'CouponAPI', '$cookieStore', '$filter', '$ionicPopup',
    function ($scope, OrderAPI, $state, $stateParams, $dialog, $ionicModal, CouponAPI, $cookieStore, $filter, $ionicPopup) {
      $scope.getOrder = function () {
        OrderAPI.get({
          id: $stateParams.id
        }, function (data) {
          $scope.order = data;
        })
      };
      $scope.payment = {
        paymentModeText:'请选择'
      };
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
      $scope.paymentType = {};
      $ionicModal.fromTemplateUrl('chose-paymentMode.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.choseModal = modal;
      });
      $scope.closeChoseModal = function(){
        $scope.choseModal.hide();
      };
      $scope.chosePaymentMode = function(){
        $scope.choseModal.show();
      };
      $scope.changePayMode = function(type){
        $scope.paymentType.cardPay = false;
        $scope.paymentType.wechatPay = false;
        $scope.paymentType.afterPay = false;
        $scope.paymentType[type] = true;
        $scope.payment.paymentMode = type;
        if($scope.paymentType.cardPay){
          $scope.payment.orderType = 1;
          $scope.payment.paymentModeText = '会员卡支付';
          $scope.payText = '请选择购物卡付款';
          $scope.choseModal.hide();
          return;
        }
        if($scope.paymentType.wechatPay){
          $scope.payment.paymentNo = null;
          $scope.payment.orderType = 1;
          $scope.payment.paymentModeText = '微信支付';
          $scope.payText = "微信支付";
          $scope.choseModal.hide();
          return;
        }
        if($scope.paymentType.afterPay){
          $scope.payment.paymentNo = null;
          $scope.payment.orderType = 3;
          $scope.payment.paymentModeText = '货到付款';
          $scope.payText = "我要货到付款";
          $scope.choseModal.hide();
          return;
        }
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
      $scope.payLoading = false;
      $scope.orderPay = function () {
        if($scope.paymentType.weixinPay){
          $scope.weixinPay();
          return;
        }
        if($scope.paymentType.cardPay && !$scope.payment.paymentNo) {
          $dialog.alert('请选择购物卡');
          return;
        }
        var member = $cookieStore.get('member');
        $scope.payLoading = true;
        OrderAPI.pay({
          orderType: $scope.payment.orderType,
          orderId: $scope.payment.orderId,
          paymentNo: $scope.payment.paymentNo
        }, function () {
          $dialog.alert("付款成功");
          $state.go('order', {type: 0});
        }).finally(function(){
          $scope.payLoading = false;
        })
      };
      $scope.isActiveBtn = function(){
        if($scope.paymentType.afterPay || $scope.paymentType.wechatPay){
          return false;
        }
        if($scope.paymentType.cardPay && ($scope.order && $scope.payment.card && $scope.order.totalAmount <= $scope.payment.card.userPrice)){
          return false;
        }
        return true;
      };
      $scope.payText = '请选择支付方式';
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
      $scope.weixinPay = function(){
        var member = $cookieStore.get('member');
        $scope.payLoading = true;
        OrderAPI.weixinPay({
          outTradeNo:$scope.payment.orderNo,
          totalFee:$scope.payment.totalAmount,
          openId:member.openId
        }, function(data){
          if(data.success){
            wx.chooseWXPay({
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonce_str,
              package: data.packageStr,
              signType: 'MD5',
              paySign: data.sign,
              success: function(res){
                $scope.payLoading = false;
                $dialog.alert("付款成功");
                $state.go('order', {type: 0});
              },
              error: function(){
                $scope.payLoading = false;
              }
            })
          }else{
            $scope.payLoading = false;
          }
        }, function(){
          $scope.payLoading = false;
        });
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
