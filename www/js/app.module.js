define([
  'angular',
  'js/app.router',
  'js/app.rest',
  'js/app.directive',
  'modules/address/address.module',
  'modules/product/product.module',
  'modules/payment/payment.module',
  'modules/order/order.module'
], function(){
  angular.module('app.module', [
     'address.module',
     'product.module',
     'order.module',
     'payment.module',
     'app.router' ,
     'app.rest',
     'app.directive'
  ]).factory('localStorage', ['$window', function($window){
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

      var resource = $resource( url, params, methods );

      return resource;
    };
  }]).factory("HttpInterceptor", ["$q", "$log", "$injector", function($q, $log, $injector){
    return {
      request: function (config) {
        if(config.method=='GET' && !config.cache){
          if(config.params){
            config.params._noCache = new Date().getTime();
          }else{
            config.params = {
              _noCache : new Date().getTime()
            }
          }
        }
        return config;
      },
      responseError:function(response){
        var $dialog;
        if(!$dialog){
          $dialog = $injector.get("$dialog");
        }
        $log.error("Response Error: ", response);
        if(response.status == 400){
          $dialog.error(response.data.message);
        }else if(response.status == 401){
          //未找到用户
          window.location.reload();
        }else if(response.status == 500){
          $dialog.error("系统操作异常，请联系管理员。");
        }
        return $q.reject(response);
      }
    }
  }])
    .run(["$ionicPlatform", function ($ionicPlatform) {
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
