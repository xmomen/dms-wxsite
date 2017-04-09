/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('address.rest', [
    "ngResource"
  ]).factory("AddressAPI", ["Resource", function(Resource){
    return Resource("/wx/memberAddress/:id", { id:"@id" }, {
      query : { isArray:true},
      getDefaultAddress:{ url: '/api/wx/getDefaultAddress' , method:'GET', isArray:false}
    });
  }]);
});
