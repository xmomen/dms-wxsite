define([
  'angular',
  'modules/address/address.api',
  'modules/address/address',
  'modules/address/address.detail'
], function(angular, api, address, detail){
  angular.module('address.module', [
     'address.rest'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('address', {
      url: '/address',
      templateUrl: 'modules/address/address.html',
      controller: address
    }).state('address_detail', {
      url:'/address/:id',
      templateUrl: 'modules/address/address.detail.html',
      controller: detail
    });
  }]);

});
