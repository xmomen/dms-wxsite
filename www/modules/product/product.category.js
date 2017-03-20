/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'ProductAPI', 'CategoryAPI', '$ionicSlideBoxDelegate', function($scope, ProductAPI, CategoryAPI, $ionicSlideBoxDelegate){
    $scope.getProducts = function(){
      ProductAPI.query({
        pageSize:10,
        pageNum:1
      }, function(data){
        $scope.products = data.data;
      });
    };
    var init = function(){
      $scope.getProducts();
    };
    init();
  }]
});
