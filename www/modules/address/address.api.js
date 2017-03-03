/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('address.rest', [
    "ngResource"
  ]).factory("AddressAPI", ["Resource", function(Resource){
    return Resource("/address/:id", { id:"@id" }, {
      query : { method:"GET", url:"/address", isArray:false}
    });
  }]);
});
