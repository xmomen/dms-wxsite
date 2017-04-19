/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function (require) {
  var angular = require('angular');
  var tabsCtrl = require('../modules/tabs');
  var accountCrtl = require('../modules/account');
  var cartCtrl = require('../modules/cart');
  var homeCtrl = require('../modules/home');

  angular.module('app.router',[
    'ui.router', 'ionic' , 'ionic-datepicker'
  ]).config(['$stateProvider', '$urlRouterProvider', '$qProvider','$ionicConfigProvider','$httpProvider', 'ionicDatePickerProvider',
  function ($stateProvider, $urlRouterProvider, $qProvider, $ionicConfigProvider, $httpProvider, ionicDatePickerProvider) {

    var datePickerObj = {
      inputDate: new Date(),
      setLabel: '确定',
      todayLabel: '今日',
      closeLabel: '关闭',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      templateType: 'modal',
      //from: new Date(2012, 8, 1),
      //to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'yyyy-MM-dd',
      closeOnSelect: true
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

    $httpProvider.interceptors.push('HttpInterceptor');
    //$locationProvider.html5Mode(true);
    //权限
    //$urlRouterProvider.deferIntercept();
    //兼容ios android
    $ionicConfigProvider.views.maxCache(0);// 禁用页面缓存
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
        params:{ "type":null, label:null , keyword:null}
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'modules/home.html',
            controller:homeCtrl
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
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  }]);
});
