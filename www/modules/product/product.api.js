/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('product.rest', [
    "ngResource"
  ]).factory("ProductAPI", ["Resource", function(Resource){
    return Resource("/product/:id", { id:"@id" }, {
      query : { isArray:false}
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
        if(carts){
          carts[item.id] = item.val;
        }else{
          carts = {};
          carts[item.id] = item.val;
        }
        localStorageService.add('cart', carts, 'json');
      },
      removeProduct: function(item){
        var carts = localStorageService.get('cart');
        carts[item.id] = undefined;
        localStorageService.add('cart', carts, 'json');
      }
    }
  }]);
});
