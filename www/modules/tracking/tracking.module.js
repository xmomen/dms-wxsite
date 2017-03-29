define([
  'angular',
  'modules/tracking/tracking.api',
  'modules/tracking/tracking'
], function(angular, api, tracking){
  angular.module('tracking.module', [
     'tracking.rest'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('tracking', {
      url:'/tracking',
      templateUrl: 'modules/tracking/tracking.html'
    });
  }]);

});
