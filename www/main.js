require(['require'], function(require){
    'use strict';
    var angular = require('angular');
    var angularAMD = require('angularAMD');
    var wx = require('wechat-api');
    var ngApp = angular.module('starter', [
        'ngResource',
        'ui.router',
        'permission',
        'permission.ui',
        "app.module",
        "LocalStorageModule",
        'ionic-datepicker',
        "ngCookies",
        "PubSubModule",
        'ionic',
        'xmomen.ui',
        'ui.bootstrap'
    ]);
    angular.element(document).ready(function() {
        //$.get('/account/permissions', function(data) {
        //    var permissionList = data;
            angularAMD.bootstrap(ngApp);
        //});
    });
    //微信jssdk配置
    $.get('/api/wx/api/jsapi_ticket?url=http://wx-test.xmomen.com/index.html', function(data) {
      var config = data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx7e9cfeede085ae15", // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名，见附录1
        jsApiList: [
          "getLocation"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
});
