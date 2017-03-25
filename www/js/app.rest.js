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
  }]).factory("WeiXinAPI", ["$http", "$q", function($http, $q){
    return {
      getJsSDKConfig: function(){
        return $http.get("/api/wx/api/jsapi_ticket", {
          params:{
            url:"http://wx-test.xmomen.com/index.html"
          }
        });
      }
    }
  }]);
});
