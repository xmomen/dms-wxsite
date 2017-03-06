define([
  'angular',
  'js/app.router',
  'js/app.rest',
  'js/app.controllers',
  'modules/address/address.module',
  'modules/product/product.module'
], function(){
  angular.module('app.module', [
     'address.module',
    'product.module',
     'app.router' ,
     'app.rest',
     'starter.controllers'
  ]).factory('Resource', [ '$resource', '$injector', "$timeout", function( $resource , $injector, $timeout) {
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
    .run(function ($ionicPlatform) {
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
    });

});
