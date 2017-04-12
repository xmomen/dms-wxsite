/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AppAPI', '$cookieStore', '$dialog', function($scope, AppAPI, $cookieStore, $dialog){
    $scope.getAccountInfo = function(){
      var member = $cookieStore.get('member');
      AppAPI.getAccount(member, function(data){
        $scope.account = data.content;
      })
    };
    $scope.showInfo = function(){
      $dialog.alert("敬请期待~");
    };
    var init = function(){
      $scope.getAccountInfo();
    };
    init();
  }]
});
