/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'ProductAPI', 'CartAPI', '$stateParams', '$ionicSlideBoxDelegate', '$state', '$dialog', '$cookieStore',
  function($scope, ProductAPI, CartAPI, $stateParams, $ionicSlideBoxDelegate, $state, $dialog, $cookieStore){
    $scope.activeIndex = 1;
    $scope.getGoods = function(){
      ProductAPI.get({
        id:$stateParams.id
      }, function(data){
        $scope.product = data;
        $ionicSlideBoxDelegate.update();
      })
    };
    $scope.getNumber = function(){

    };
    $scope.pushCart = function(){
      var member = $cookieStore.get('member');
      CartAPI.create({
        memberId:member.memberId,
        itemId:$scope.product.id
      }, function(){
        $dialog.alert("成功放入购物车");
      });
    };
    $scope.buy = function(){
      $state.go('payment_confirm', {
        products:[$scope.product]
      });
    };
    var init = function(){
      $scope.getGoods();
    };
    init();
  }]
});
