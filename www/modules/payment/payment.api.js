/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('payment.rest', [
    "ngResource"
  ]).factory("PaymentAPI", ["Resource", function(Resource){
    return Resource("/payment/:id", { id:"@id" }, {
      query : { method:"GET", url:"/payment", isArray:false}
    });
  }]);
});
