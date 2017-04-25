define([
  'angular',
  'modules/account/account.card',
  'modules/account/account.card.bind',
  'modules/account/account.card.recharge'
], function(angular, card, cardBind, cardRecharge){
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
    }).state('account_card_recharge', {
      url: '/account/card/recharge',
      templateUrl: 'modules/account/account.card.recharge.html',
      params:{
        cardNo:null,
        id:null
      },
      data: {
        permissions: {
          only: 'isAuthorized'
        }
      },
      controller: cardRecharge
    });
  }]);

});
