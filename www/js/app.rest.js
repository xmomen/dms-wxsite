/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('app.rest', [
    "ngResource"
  ]).factory("AppAPI", ["Resource", function(Resource){
    return Resource("/account/:id", { id:"@id" }, {
      getAccount : { method:"GET", url:"/api/wx/userInfo", isArray:false, params:{
        memberId:'@memberId',
        openId:'@openId',
        accessToken:'@accessToken'
      }},
      login: { method:'GET', url : "/api/", isArray:false}
    });
  }]).factory("MemberAPI", ["Resource", function(Resource){
    return Resource("/wx/member/:id", { id:"@id" }, {
      update : { method:"PUT", url:"/api/wx/member/:id", params:{
        id:'@id',
        mobile:'@mobile'
      }}
    });
  }]).factory("BindAPI", ["Resource", function(Resource){
    return Resource("/wx/:memberId", { id:"@id" }, {
      bindMember : { method:"PUT", url:"/api/wx/bindMember", params:{
        openId:"@openId",
        memberId:"@memberId",
        name:"@name",
        mobile:"@mobile"
      }, isArray:false}
    });
  }]).factory("WeiXinAPI", ["$http", "$q", function($http, $q){
    return {
      getJsSDKConfig: function(){
        return $http.get("/api/wx/api/jsapi_ticket", {
          params:{
            url:"http://m.1g3h.com/index.html"
          }
        });
      }
    }
  }]);
});
