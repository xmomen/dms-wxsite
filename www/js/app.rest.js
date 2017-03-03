/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('app.rest', [
    "ngResource"
  ]).factory("AppAPI", ["Resource", function(Resource){
    return Resource("/account/:id", { id:"@id" }, {
      getAccount : { method:"GET", url:"/account", isArray:false}
    });
  }]);
});
