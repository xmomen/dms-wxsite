require(['require'], function(require){
    'use strict';
    var angular = require('angular');
    var angularAMD = require('angularAMD');
    var ngApp = angular.module('starter', [
        'ngResource',
        'ui.router',
        'permission',
        "app.module",
        "LocalStorageModule",
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
});
