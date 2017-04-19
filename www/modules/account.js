/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AppAPI', '$cookieStore', '$dialog', 'OrderAPI', function($scope, AppAPI, $cookieStore, $dialog, OrderAPI){
    $scope.getAccountInfo = function(){
      var member = $cookieStore.get('member');
      AppAPI.getAccount(member, function(data){
        $scope.account = data.content;
      })
    };
    $scope.showInfo = function(){
      $dialog.alert("敬请期待~");
    };
    $scope.orderCount = {};
    $scope.getStatistic = function(){
      var member = $cookieStore.get('member');
      OrderAPI.getStatistic({
        memberId:member.memberId
      }, function(data){
        $scope.orderCount = data;
      })
    };
    var init = function(){
      $scope.getAccountInfo();
      $scope.getStatistic();
    };
    init();
  }]
});
