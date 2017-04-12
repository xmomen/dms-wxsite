define([
  'angular',
  'modules/account/account.card'
], function(angular, card){
  angular.module('account.module', [
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('account_card', {
      url: '/account/card',
      templateUrl: 'modules/account/account.car.html',
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      },
      controller: card
    });
  }]);

});
