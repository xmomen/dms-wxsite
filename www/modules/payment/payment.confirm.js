/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'PaymentAPI', 'AddressAPI', '$stateParams', '$ionicModal', '$state','$dialog','OrderAPI','$cookieStore','ionicDatePicker', '$filter',
  function($scope, PaymentAPI, AddressAPI, $stateParams, $ionicModal, $state, $dialog, OrderAPI, $cookieStore, ionicDatePicker, $filter){
    $scope.payment = {};
    $ionicModal.fromTemplateUrl('chose-address.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.addressModal = modal;
    });
    $scope.getAddressInfo = function(){
      var member = $cookieStore.get('member');
      AddressAPI.query({
        memberId:member.memberId,
        limit:10,
        offset:1
      }, function(data){
        $scope.address = data;
      })
    };
    $scope.payment = {};
    $scope.submitOrder = function(){
      if(!$scope.payment.address){
        $dialog.alert('请选择收货人');
        return;
      }
      if(!$scope.payment.appointmentTime){
        $dialog.alert('请选择预约时间');
        return;
      }
      if(!$scope.payment.products || $scope.payment.products.length == 0){
        $dialog.alert('订单不存在商品，请选择商品后重新提交');
        return;
      }
      var order = {
        consigneeName:$scope.payment.consigneeName,
        consigneePhone:$scope.payment.consigneePhone,
        consigneeAddress:$scope.payment.consigneeAddress,
        orderType:$scope.payment.orderType,
        paymentRelationNo:$scope.payment.paymentRelationNo,
        appointmentTime:$scope.payment.appointmentTime,
        orderItemList:[]
      };
      for (var i = 0; i < $scope.payment.products.length; i++) {
        var obj = $scope.payment.products[i];
        order.orderItemList.push({
          orderItemId:obj.id,
          itemQty:obj.itemQty
        });
      }
      var member = $cookieStore.get('member');
      order.createUserId = member.memberId;
      OrderAPI.create(order, function(data){
        $state.go('order_detail', {id:data.id});
      });
    };
    $scope.openDatePicker = function(){
      var curDate = new Date();
      var startDate = new Date((curDate/1000+86400)*1000);
      ionicDatePicker.openDatePicker({
        callback: function (val) {  //Mandatory
          $scope.payment.appointmentTime = new Date(val);
        },
        from: startDate
      });
    };
    $scope.openAddressModal = function() {
      $scope.addressModal.show();
      $scope.getAddressInfo();
    };
    $scope.closeAddressModal = function() {
      $scope.addressModal.hide();
    };
    //选择收货地址
    $scope.choseAddress = function(index){
      $scope.payment.address = $scope.address[index];
      $scope.payment.consigneePhone = $scope.address[index].mobile;
      $scope.payment.consigneeName = $scope.address[index].name;
      $scope.payment.consigneeAddress = $scope.address[index].fullAddress;
      $scope.addressModal.hide();
    };
    $ionicModal.fromTemplateUrl('chose-coupon.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.couponModal = modal;
    });
    //选择优惠券
    $scope.choseCoupon = function(index){
      $scope.payment.coupon = $scope.coupon[index];
    };
    $scope.openCouponModal = function() {
      $scope.couponModal.show();
      $scope.getAddressInfo();
    };
    $scope.closeCouponModal = function(){
      $scope.couponModal.hide();
    };
    $scope.totalAmount = function(){
      var amount = 0;
      for (var i = 0; i < $scope.payment.products.length; i++) {
        var obj = $scope.payment.products[i];
        amount = amount + (obj.sellPrice * obj.itemQty);
      }
      return amount;
    };
    $scope.goAddress = function(){
      $scope.addressModal.hide();
      $state.go('address_detail');
    };
    $scope.getDefaultAddress = function(){
      var member = $cookieStore.get('member');
      AddressAPI.getDefaultAddress({
        memberId:member.memberId
      }, function(data){
        if(data.id){
          $scope.payment.address = data;
          $scope.payment.consigneePhone = data.mobile;
          $scope.payment.consigneeName = data.name;
          $scope.payment.consigneeAddress = data.fullAddress;
        }
      })
    };
    var init = function(){
      if($stateParams.products){
        $scope.payment.products = $stateParams.products;
      }
      if($stateParams.couponNo){
        $scope.payment.paymentRelationNo = $stateParams.couponNo;
        $scope.payment.orderType = 2;
      }
      $scope.getDefaultAddress();
    };
    init();
  }]
});
