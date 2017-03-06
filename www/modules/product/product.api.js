/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('product.rest', [
    "ngResource"
  ]).factory("ProductAPI", ["Resource", function(Resource){
    return Resource("/product/:id", { id:"@id" }, {
      query : { method:"GET", url:"/product", isArray:false}
    });
  }]);
});
