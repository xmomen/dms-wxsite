define([
  'angular',
  'modules/order/order.api',
  'modules/order/order',
  'modules/order/order.detail',
  'modules/order/order.fast'
], function(angular, api, order, orderDetail, orderFast){
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
    }).state('order_fast', {
      url:'/order_fast',
      templateUrl:'modules/order/order.fast.html',
      controller:orderFast,
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      }
    });
  }]);

});
