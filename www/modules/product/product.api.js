/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('product.rest', [
    "ngResource"
  ]).factory("ProductAPI", ["Resource", function(Resource){
    return Resource("/product/:id", { id:"@id" }, {
      query : { isArray:false},
      getCartProduct:{ isArray:true, url: '/api/cart', method:"GET", params:{
          productIds:"@productIds"
        }
      }
    });
  }]).factory("CategoryAPI", ["Resource", function(Resource){
    return Resource("/category/:id", { id:"@id" }, {
      query : { isArray:true}
    });
  }]).factory("CouponAPI", ["Resource", function(Resource){
    return Resource("/coupon/:id", { id:"@id" }, {
      query : { isArray:false }
    })
  }]).factory("CartAPI", ["localStorageService", function(localStorageService){
    return {
      //获取产品
      pullProducts: function(){
        var data = localStorageService.get('cart', 'json');
        var newData = [];
        angular.forEach(data, function(val){
          newData.push(val);
        });
        return newData;
      },
      //放入产品到购物车
      pushProduct: function(item){
        var carts = localStorageService.get('cart');
        if(!carts){
          carts = [];
        }
        carts.push(angular.copy(item));
        localStorageService.add('cart', carts, 'json');
      },
      removeProduct: function(item){
        var carts = localStorageService.get('cart');
        if(carts){
          for (var j = 0; j < carts.length; j++) {
            var obj = carts[j];
            if(obj.id == item.id){
              carts.splice(j, 1);
              break;
            }
          }
        }
        localStorageService.add('cart', carts, 'json');
      }
    }
  }]);
});
