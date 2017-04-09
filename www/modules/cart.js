/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AppAPI', '$dialog', '$state', 'CartAPI', 'pubSub', 'ProductAPI', '$cookieStore', function($scope, AppAPI, $dialog, $state, CartAPI, pubSub, ProductAPI , $cookieStore){
    $scope.products = [];
    pubSub.subscribe('changeCart', function(){
      $scope.getProductCart();
    });

    $scope.getProductCart = function(){
      var member = $cookieStore.get('member');
      CartAPI.query({
        memberId:member.memberId
      }, function(data){
        $scope.products = data;
      })
    };
    $scope.changeNumber = function(product){
      var items = [];
      for (var i = 0; i < product.itemQty; i++) {
        items.push(product);
      }
      CartAPI.resetProduct(items);
    };
    $scope.addNumber = function(product){
      var member = $cookieStore.get('member');
      product.itemQty = product.itemQty + 1;
      CartAPI.create({
        memberId:member.memberId,
        itemId:product.id,
        itemQty:product.itemQty
      });
    };
    $scope.subNumber = function(item){
      if(item.itemQty > 1){
        item.itemQty = item.itemQty - 1;
        var member = $cookieStore.get('member');
        CartAPI.create({
          memberId:member.memberId,
          itemId:item.id,
          itemQty:item.itemQty
        });
      }
    };
    $scope.remove = function(index){
      $dialog.confirm('是否删除该商品').then(function(){
        var member = $cookieStore.get('member');
        CartAPI.create({
          memberId:member.memberId,
          itemId:$scope.products[index].id,
          itemQty: 0
        });
        $scope.products.splice(index, 1);
      })
    };
    $scope.totalAmount = function(){
      var amount = 0;
      for (var i = 0; i < $scope.products.length; i++) {
        var obj = $scope.products[i];
        if(obj.checked){
          amount = amount + (obj.sellPrice * obj.itemQty);
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
      $scope.getProductCart();
    };
    init();
  }]
});
