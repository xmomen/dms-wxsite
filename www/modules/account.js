/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AppAPI', '$cookieStore', function($scope, AppAPI, $cookieStore){
    $scope.getAccountInfo = function(){
      var member = $cookieStore.get('member');
      AppAPI.getAccount(member, function(data){
        $scope.account = data;
      })
    };
    var init = function(){
      $scope.getAccountInfo();
    };
    init();
  }]
});
