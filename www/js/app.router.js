/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  var accountCrtl = require('../modules/account');

  angular.module('app.router',['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'modules/tabs.html'
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
            controller: 'CartCtrl'
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
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
});
