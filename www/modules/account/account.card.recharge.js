/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'OrderAPI', '$cookieStore', '$dialog', '$stateParams', '$state', function($scope, OrderAPI, $cookieStore, $dialog, $stateParams, $state){
    $scope.card = {};
    $scope.payLoading = false;
    $scope.recharge = function(){
      if(!$scope.card || !$scope.card.amount){
        $dialog.alert('请输入充值的金额');
        return;
      }
      var member = $cookieStore.get('member');
      $scope.payLoading = true;
      OrderAPI.weixinPay({
        type:2,
        outTradeNo:$scope.card.number,
        totalFee:$scope.card.amount,
        openId:member.openId
      }, function(data){
        if(data.result_code == 'SUCCESS'){
          wx.chooseWXPay({
            appId: data.appid,
            timestamp: data.timeStamp,
            nonceStr: data.nonce_str,
            package: data.packageStr,
            signType: 'MD5',
            paySign: data.sign,
            success: function(res){
              $scope.payLoading = false;
              $dialog.alert("充值成功");
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
    }
    if($stateParams.cardNo){
      $scope.card.number = $stateParams.cardNo;
    }
  }]
});
