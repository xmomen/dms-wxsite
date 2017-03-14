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
          controller: product
        }
      }
    }).state('product_detail', {
      url:'/product/{id}',
      templateUrl: 'modules/product/product.detail.html',
      controller: detail
    });
  }]).factory('ClassService', function () {
    function getFirstClass(){
      var firstClass = [
        {id:1,name:"A1"},
        {id:2,name:"A2"},
        {id:3,name:"A3"},
        {id:4,name:"A4"},
        {id:5,name:"A5"},
        {id:5,name:"A5"},
        {id:5,name:"A5"},
        {id:5,name:"A5"},
        {id:5,name:"A5"}
      ]
      return firstClass;
    }
    function getSecondClass (firstClassName){
      var secondClass = [
        {id:1,name:firstClassName+"B1"},
        {id:2,name:firstClassName+"B2"},
        {id:3,name:firstClassName+"B3"},
        {id:4,name:firstClassName+"B4"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:3,name:firstClassName+"B3"},
        {id:4,name:firstClassName+"B4"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:3,name:firstClassName+"B3"},
        {id:4,name:firstClassName+"B4"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:1,name:firstClassName+"B1"},
        {id:2,name:firstClassName+"B2"},
        {id:3,name:firstClassName+"B3"},
        {id:4,name:firstClassName+"B4"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:3,name:firstClassName+"B3"},
        {id:4,name:firstClassName+"B4"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:3,name:firstClassName+"B3"},
        {id:4,name:firstClassName+"B4"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"},
        {id:5,name:firstClassName+"B5"}
      ]
      return secondClass;
    }
    function getThirdClass (secondClassName){
      var thirdClass = [
        {id:1,name:secondClassName+"C1"},
        {id:2,name:secondClassName+"C2"},
        {id:3,name:secondClassName+"C3"},
        {id:4,name:secondClassName+"C4"},
        {id:5,name:secondClassName+"C5"}
      ]
      return thirdClass
    }
    return{
      getFirstClass:getFirstClass,
      getSecondClass:getSecondClass,
      getThirdClass:getThirdClass
    }
  });;

});
