define([
  'angular',
  'modules/product/product.api',
  'modules/product/product',
  'modules/product/product.detail'
], function(angular, api, product, detail){
  angular.module('product.module', [
     'product.rest'
  ]).directive('scrollHeight',function($window){
    return{
      restrict:'A',
      link:function(scope,element,attr){
        element[0].style.height=$window.innerHeight+'px';
      }
    }
  }).directive('scrollWidth',function($window){
    return{
      restrict:'A',
      link:function(scope,element,attr){
        element[0].style.width=$window.innerWidth + 'px';
      }
    }
  }).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('tab.product', {
      url: '/product',
      views: {
        'tab-product': {
          templateUrl: 'modules/product/product.html',
          controller: product,
          params:{ "type":null, label:null, keyword:null }
        }
      }
    }).state('product_detail', {
      url:'/product/{id}',
      templateUrl: 'modules/product/product.detail.html',
      controller: detail
    }).state('product_category', {
      url:'/product/category/:type',
      templateUrl: 'modules/product/product.category.html',
      controller: product
    });
  }]);

});
