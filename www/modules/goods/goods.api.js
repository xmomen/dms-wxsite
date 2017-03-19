/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('goods.rest', [
    "ngResource"
  ]).factory("GoodsAPI", ["Resource", function(Resource){
    return Resource("/goods/:id", { id:"@id" }, {
      query : { method:"GET", url:"/goods", isArray:false}
    });
  }]);
});
