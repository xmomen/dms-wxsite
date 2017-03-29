/**
 * Created by VI-H20 on 17/3/29.
 */
define(function (require) {
  var angular = require('angular');
  return angular.module('tracking.rest', [
    "ngResource"
  ]).factory("TrackingAPI", ["Resource", function(Resource){
    return Resource({
    });
  }]);
});
