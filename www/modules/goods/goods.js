/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'GoodsAPI',  '$ionicSlideBoxDelegate', function($scope, GoodsAPI, $ionicSlideBoxDelegate){
    $scope.getGoods = function(){
      GoodsAPI.query({
        pageSize:10,
        pageNum:1
      }, function(data){
        $scope.goods = data.data;
      })
    };
    var init = function(){
      $scope.getGoods();
    };
    init();
  }]
});
