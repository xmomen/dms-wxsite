/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('order.rest', [
    "ngResource"
  ]).factory("OrderAPI", ["Resource", function(Resource){
    return Resource("/wx/order/:id", { id:"@id" }, {
      query : { isArray:true , params:{
        memberId:"@memberId"
      }},
      cancel: { url:'/api/wx/order/cancel', method:"POST" , params:{
        id:"@id",
        memberId:"@memberId"
      }},
      getStatistic: { url:'/api/wx/order/statistic', method:"GET" , params:{
        memberId:"@memberId"
      }},
      getCouponProduct: { url: '/api/wx/order/coupon', method:'GET', isArray:true},
      confirm: { url: '/api/wx/order/confirm', method:'POST', isArray:true},
      pay: { url: '/api/wx/order/pay', method:'POST'},
      weixinPay: { url: '/api/wx/api/payOrder', method:'POST'}
    });
  }]).factory("CouponAPI", ["Resource", function(Resource){
    return Resource("/wx/coupon/:id", { id:"@id" }, {
      query : { isArray:true , params:{
        memberId:"@memberId"
      }},
      bindCard: { method:'POST', url: '/api/wx/coupon/bind', params:{
        memberId:"@memberId",
        couponNumber:"@couponNumber"
      }}
    });
  }]);
});
