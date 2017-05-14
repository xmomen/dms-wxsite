define([
  'angular',
  'js/app.controller',
  'js/app.router',
  'js/app.rest',
  'js/app.directive',
  'modules/address/address.module',
  'modules/product/product.module',
  'modules/payment/payment.module',
  'modules/account/account.module',
  'modules/order/order.module',
  'modules/tracking/tracking.module'
], function(angular, appCtrl){
  angular.module('app.module', [
     'address.module',
     'product.module',
     'account.module',
     'order.module',
     'tracking.module',
     'payment.module',
     'app.router' ,
     'app.rest',
     'app.directive'
  ]).controller('dmsCtrl', appCtrl).factory('localStorage', ['$window', function($window){
    return{        //存储单个属性
      set :function(key, value){
        $window.localStorage[key]=value;
      },        //读取单个属性
      get:function(key, defaultValue){
        return  $window.localStorage[key] || defaultValue;
      },        //存储对象，以JSON格式存储
      setObject:function(key,value){
        $window.localStorage[key]=JSON.stringify(value);
      },        //读取对象
      getObject: function (key) {
        var obj = $window.localStorage[key];
        if(obj){
          return JSON.parse($window.localStorage[key])
        }
        return null;
      }

    }
  }]).factory('Resource', [ '$resource', '$injector', "$timeout", function( $resource , $injector, $timeout) {
    var $dialog;

    return function( url, params, methods ) {

      var defaults = {
        query: {method: "GET", isArray: false},
        update: { method: 'PUT' },
        create: { method: 'POST' }
      };

      methods = angular.extend( defaults, methods );

      var resource = $resource( '/api' + url, params, methods );
      return resource;
    };
  }]).factory('$UrlUtils', [function(){
    var getParams = function(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
    };
    return {
      getParams:getParams
    }
  }])
    .run(["$ionicPlatform", "$rootScope", "PermPermissionStore", "AppAPI", "$http", "$urlRouter", "$q", '$UrlUtils', '$cookieStore', '$filter',
    function ($ionicPlatform, $rootScope, PermPermissionStore, AppAPI, $http, $urlRouter, $q, $UrlUtils , $cookieStore, $filter) {
      var params = {
        openId:$UrlUtils.getParams('openId'),
        memberId:$UrlUtils.getParams('memberId')
      };
      //alert($filter('json')(params));
      //var member = $cookieStore.get('member');
      //if(!member && params.openId){
      //  $cookieStore.put('member', params);
      //}
      $cookieStore.put('member', params);

      PermPermissionStore
        .definePermission('isAuthorized', function () {
          var defer = $q.defer();
          var cmember = $cookieStore.get('member');
          if(cmember && cmember.phone){
            defer.resolve();
          }else{
            defer.reject();
          }
          return defer.promise;
        });
      $http
        .get('/api/wx/userInfo', {
          params:params
        })
        .then(function(data){
          if(data.data && data.data.content && data.data.content.phone){
            $cookieStore.put('member', {
              memberId:params.memberId,
              openId:params.openId,
              phone:data.data.content.phone
            });
          }
        });

      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

      });
    }]);

});
