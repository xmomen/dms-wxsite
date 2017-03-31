/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('order.rest', [
    "ngResource"
  ]).factory("OrderAPI", ["Resource", function(Resource){
    return Resource("/wx/order/:id", { id:"@id" }, {
      query : { isArray:true }
    });
  }]);
});
