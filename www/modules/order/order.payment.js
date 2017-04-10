/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'OrderAPI','$state', '$stateParams', '$dialog', '$ionicModal', function($scope, OrderAPI, $state, $stateParams, $dialog, $ionicModal){
    $scope.payment = {};
    $ionicModal.fromTemplateUrl('chose-card.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.cardModal = modal;
    });
    $scope.queryCard = function(){

    };
    $scope.cardPay = function(){
      var member = $cookieStore.get('member');
      OrderAPI.pay({
        orderId:$scope.payment.orderId,
        paymentNo:$scope.payment.paymentNo
      }, function(){
        $dialog.alert("付款成功");
        $state.go('order');
      })
    };

    var init = function(){
      if($stateParams.id){
        $scope.payment.orderId = $stateParams.id;
      }
    };
    init();
  }]
});
