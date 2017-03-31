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
      $scope.productIds = items;
      $scope.getProductCart();
    };
    $scope.getProductCart = function(){
      var productIds = [];
      angular.forEach($scope.productIds, function(val, index){
        productIds.push(val.id);
      });
      ProductAPI.getCartProduct({
        productIds:productIds
      }, function(data){
        $scope.products = data;
        angular.forEach($scope.products, function(val ,index){
          angular.forEach($scope.productIds, function(cval, cindex){
            if(val.id == cval.id){
              if(val.number){
                val.number++;
              }else{
                val.number = 1;
              }
            }
          })
        });
      })
    };
    $scope.changeNumber = function(product){
      var items = [];
      for (var i = 0; i < product.number; i++) {
        items.push(product);
      }
      CartAPI.resetProduct(items);
    };
    $scope.addNumber = function(product){
      product.number = product.number + 1;
      CartAPI.pushProduct(product);
    };
    $scope.subNumber = function(item){
      if(item.number > 1){
        item.number = item.number - 1;
        CartAPI.removeProduct(item);
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
    $scope.$watch('checkAll', function(newVal, oldVal){
        for (var i = 0; i < $scope.products.length; i++) {
          $scope.products[i].checked = newVal;
        }
    });
    var init = function(){
      $scope.getCartData();
    };
    init();
  }]
});
