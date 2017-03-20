/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AppAPI', function($scope, AppAPI){
    $scope.getAccountInfo = function(){
      AppAPI.getAccount({}, function(data){
        $scope.account = data;
      })
    };
    var init = function(){
      $scope.getAccountInfo();
    };
    init();
  }]
});
