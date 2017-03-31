define([
  'angular',
  'modules/order/order.api',
  'modules/order/order',
  'modules/order/order.detail'
], function(angular, api, order, orderDetail){
  angular.module('order.module', [
     'order.rest'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('order', {
      url:'/order',
      templateUrl: 'modules/order/order.html',
      params:{
        type:null
      },
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      },
      controller: order
    }).state('order_detail', {
      url:'/order/{id}',
      templateUrl:'modules/order/order.detail.html',
      controller:orderDetail,
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      }
    });
  }]);

});
