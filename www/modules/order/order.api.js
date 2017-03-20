/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('order.rest', [
    "ngResource"
  ]).factory("OrderAPI", ["Resource", function(Resource){
    return Resource("/order/:id", { id:"@id" }, {
      query : { method:"GET", url:"/order", isArray:false}
    });
  }]);
});
