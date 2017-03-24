/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AppAPI', '$dialog', '$state', 'CartAPI', 'pubSub', 'ProductAPI', function($scope, AppAPI, $dialog, $state, CartAPI, pubSub, ProductAPI){
    $scope.products = [];
    pubSub.subscribe('changeCart', function(){
      $scope.getCartData();
    });
    $scope.getCartData = function(){
      var items = CartAPI.pullProducts();
      $scope.products = items;
    };
    $scope.subNumber = function(item){
      if(item.number > 1){
        item.number = item.number - 1
      }
    };
    $scope.remove = function(index){
      $dialog.confirm('是否删除该商品').then(function(){
        CartAPI.removeProduct($scope.products[index]);
        $scope.products.splice(index, 1);
      })
    };
    $scope.totalAmount = function(){
      var amount = 0;
      for (var i = 0; i < $scope.products.length; i++) {
        var obj = $scope.products[i];
        if(obj.checked){
          amount = amount + (obj.sellPrice * obj.number);
        }
      }
      return amount;
    };
    $scope.confirmOrder = function(){
      var choseProducts = [];
      for (var i = 0; i < $scope.products.length; i++) {
        var obj = $scope.products[i];
        if(obj.checked){
          choseProducts.push(obj);
        }
      }
      $state.go('payment_confirm', { products: choseProducts });
    };
    var init = function(){
      $scope.getCartData();
    };
    init();
  }]
});
