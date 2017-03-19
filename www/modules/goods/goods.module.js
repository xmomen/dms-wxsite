define([
  'angular',
  'modules/goods/goods.api',
  'modules/goods/goods',
  'modules/goods/goods.detail'
], function(angular, api, goods, detail){
  angular.module('goods.module', [
     'goods.rest'
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
    $stateProvider.state('tab.goods', {
      url: '/goods',
      views: {
        'tab-product': {
          templateUrl: 'modules/goods/goods.html',
          controller: goods
        }
      }
    }).state('goods', {
      url:'/goods/{id}',
      templateUrl: 'modules/goods/goods.detail.html',
      controller: goods
    });
  }]).factory('ClassService', function () {

  });

});
