/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'AppAPI', '$stateParams', '$rootScope', function($scope, AppAPI, $stateParams, $rootScope){
    // 获取用户当前位置
    $scope.locationInfo = {};
    $scope.getLocation = function(){
      $scope.locationInfo.name = "上海";
    };
    var init = function(){
      $scope.getLocation();
    };
    init();
  }]
});
