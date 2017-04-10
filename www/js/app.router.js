/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  var tabsCtrl = require('../modules/tabs');
  var accountCrtl = require('../modules/account');
  var cartCtrl = require('../modules/cart');
  var homeCtrl = require('../modules/home');

  angular.module('app.router',['ui.router', 'ionic']).config(['$stateProvider', '$urlRouterProvider', '$qProvider','$ionicConfigProvider','$httpProvider',
  function ($stateProvider, $urlRouterProvider, $qProvider, $ionicConfigProvider, $httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    //$locationProvider.html5Mode(true);
    //权限
    //$urlRouterProvider.deferIntercept();
    //兼容ios android
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $qProvider.errorOnUnhandledRejections(false);
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'modules/tabs.html',
        controller: tabsCtrl,
        data: {
          permissions: {
            only: 'isAuthorized'
          }
        }
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'modules/home.html',
            controller:homeCtrl,
            data: {
              permissions: {
                only: 'isAuthorized'
              }
            }
          }
        }
      })

      .state('tab.cart', {
        url: '/cart',
        views: {
          'tab-cart': {
            templateUrl: 'modules/cart.html',
            controller: cartCtrl,
            params:{
              products:null
            },
            data: {
              permissions: {
                only: 'isAuthorized'
              }
            }
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'modules/account.html',
            controller: accountCrtl,
            data: {
              permissions: {
                only: 'isAuthorized'
              }
            }
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  }]);
});
