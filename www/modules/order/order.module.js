define([
  'angular',
  'modules/order/order.api',
  'modules/order/order'
], function(angular, api, order){
  angular.module('order.module', [
     'order.rest'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('order', {
      url:'/order/{type}',
      templateUrl: 'modules/order/order.html',
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      },
      controller: order
    });
  }]);

});
