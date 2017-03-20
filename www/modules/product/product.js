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
      })
    };
    $scope.categorys = [];
    $scope.getCategory = function(){
      CategoryAPI.query({}, function(data){
        $scope.categorys = data;
      })
    };
    //初始化
    $scope.slideIndex = 0;
    $scope.slideSecondIndex = 0;

    $scope.firstClick = function (index,item,event) {
      $scope.slideIndex = index;
    };
    $scope.secondClick = function (index,item){
      $scope.slideSecondIndex = index;
    };
    $scope.thirdClick = function (index,item) {
      $scope.slideThirdIndex = index;
      $scope.text = item.name;
    };
    var init = function(){
      $scope.getProducts();
      $scope.getCategory();
    };
    init();
  }]
});
