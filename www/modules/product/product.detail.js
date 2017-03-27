/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'ProductAPI', 'CartAPI', '$stateParams', '$ionicSlideBoxDelegate', '$state', '$dialog',
  function($scope, ProductAPI, CartAPI, $stateParams, $ionicSlideBoxDelegate, $state, $dialog){
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
      CartAPI.pushProduct($scope.product);
      $dialog.alert("成功放入购物车");
    };
    $scope.buy = function(){
      $state.go('payment_confirm', {
        products:[{
          id:$scope.product.id
        }]
      });
    };
    var init = function(){
      $scope.getGoods();
    };
    init();
  }]
});
