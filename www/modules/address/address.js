/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'AddressAPI', '$cookieStore', function($scope, AddressAPI, $cookieStore){
    $scope.getAddressInfo = function(){
      var member = $cookieStore.get('member');
      AddressAPI.query({
        memberId:member.memberId,
        limit:10,
        offset:1
      }, function(data){
        $scope.address = data;
      })
    };
    var init = function(){
      $scope.getAddressInfo();
    };
    init();
  }]
});
