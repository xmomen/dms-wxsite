define([
  'angular',
  'modules/address/address.api',
  'modules/address/address'
], function(angular, api, address){
  //var angular = require('angular');
  //require('./modules/address/address.api');
  //var address = require('./modules/address/address');
  angular.module('address.module', [
     'address.rest'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $stateProvider.state('address', {
      url: '/address',
      templateUrl: 'modules/address/address.html',
      controller: address
    });
  }]);

});
