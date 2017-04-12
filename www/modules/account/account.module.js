define([
  'angular',
  'modules/account/account.card',
  'modules/account/account.card.bind'
], function(angular, card, cardBind){
  angular.module('account.module', [
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('account_card', {
      url: '/account/card',
      templateUrl: 'modules/account/account.card.html',
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      },
      controller: card
    }).state('account_card_bind', {
      url: '/account/card/bind',
      templateUrl: 'modules/account/account.card.bind.html',
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      },
      controller: cardBind
    });
  }]);

});
