define([
  'angular',
  'modules/payment/payment.api',
  'modules/payment/payment.confirm'
], function(angular, api, paymentConfirm){
  angular.module('payment.module', [
     'payment.rest'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('payment_confirm', {
      url: '/payment/confirm',
      templateUrl: 'modules/payment/payment.confirm.html',
      controller: paymentConfirm,
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      },
      params:{
        products:null,
        couponNo:null
      }
    });
  }]);

});
