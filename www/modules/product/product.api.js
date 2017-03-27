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
  }]).factory("CartAPI", ["localStorage", function(localStorage){
    return {
      //获取产品
      pullProducts: function(){
        var data = localStorage.getObject('cart');
        var newData = [];
        angular.forEach(data, function(val){
          newData.push(val);
        });
        return newData;
      },
      resetProduct: function(items){
        if(!items && items.length <= 0){
          return;
        }
        var carts = localStorage.getObject('cart');
        if(carts){
          for (var j = carts.length-1; j >= 0; j--) {
            var obj = carts[j];
            if(obj.id == items[0].id){
              carts.splice(j, 1);
            }
          }
        }
        for (var i = 0; i < items.length; i++) {
          carts.push(angular.copy(items[i]));
        }
        localStorage.setObject('cart', carts);
      },
      //放入产品到购物车
      pushProduct: function(item){
        var carts = localStorage.getObject('cart');
        if(!carts){
          carts = [];
        }
        carts.push(angular.copy(item));
        localStorage.setObject('cart', carts);
      },
      removeProduct: function(item){
        var carts = localStorage.getObject('cart');
        if(carts){
          for (var j = 0; j < carts.length; j++) {
            var obj = carts[j];
            if(obj.id == item.id){
              carts.splice(j, 1);
              break;
            }
          }
        }
        localStorage.getObject('cart', carts);
      }
    }
  }]);
});
