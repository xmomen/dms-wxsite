/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'AppAPI', '$stateParams', function($scope, AppAPI, $stateParams){
    var init = function(){
      if($stateParams.id){
        $scope.getAddressInfo();
      }
      $scope.getAddressInfo();
    };
    init();
  }]
});
