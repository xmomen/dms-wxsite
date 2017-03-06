define([
  'angular',
  'modules/product/product.api',
  'modules/product/product',
  'modules/product/product.detail'
], function(angular, api, product, detail){
  angular.module('product.module', [
     'product.rest'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('tab.product', {
      url: '/product',
      views: {
        'tab-product': {
          templateUrl: 'modules/product/product.html',
          controller: product
        }
      }
    }).state('product_detail', {
      url:'/product/:id',
      templateUrl: 'modules/product/product.detail.html',
      controller: detail
    });
  }]);

});
