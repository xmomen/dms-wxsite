/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'ProductAPI', 'ClassService', '$ionicSlideBoxDelegate', function($scope, ProductAPI, ClassService, $ionicSlideBoxDelegate){
    $scope.getAddressInfo = function(){
      ProductAPI.query({
        pageSize:10,
        pageNum:1
      }, function(data){
        $scope.address = data.data;
      })
    };
    //初始化
    $scope.firstClass = ClassService.getFirstClass();
    $scope.secondClass = ClassService.getSecondClass($scope.firstClass[0].name);
    $scope.thirdClass = ClassService.getThirdClass($scope.secondClass[0].name);
    $scope.text = $scope.thirdClass[0].name;
    $scope.slideIndex = 0;
    $scope.slideSecondIndex = 0;
    $scope.slideThirdIndex = 0;


    $scope.firstClick = function (index,item,event) {
      $scope.slideIndex = index;
      $scope.secondClass = ClassService.getSecondClass(item.name)
      $scope.slideSecondIndex = 0;
      $scope.thirdClass = ClassService.getThirdClass($scope.secondClass[0].name);
      $scope.slideThirdIndex = 0
      $scope.text = $scope.thirdClass[0].name;
      //event.target.style.border = "2px solid blue"
    };
    $scope.secondClick = function (index,item){
      $scope.slideSecondIndex = index;
      $scope.thirdClass = ClassService.getThirdClass(item.name);
    }
    $scope.thirdClick = function (index,item) {
      $scope.slideThirdIndex = index;
      $scope.text = item.name;
    }
    var init = function(){
      $scope.getAddressInfo();
    };
    init();
  }]
});
