/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  var tabsCtrl = require('../modules/tabs');
  var accountCrtl = require('../modules/account');
  var loginCtrl = require('../modules/login');
  var cartCtrl = require('../modules/cart');

  angular.module('app.router',['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'modules/tabs.html',
        controller: tabsCtrl
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'modules/home.html',
            controller: 'HomeCtrl'
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
            }
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'modules/account.html',
            controller: accountCrtl
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'modules/login.html',
        controller: loginCtrl
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
});
