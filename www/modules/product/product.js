/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'ProductAPI', 'CategoryAPI', '$ionicSlideBoxDelegate', '$stateParams', 'CartAPI', 'pubSub', '$dialog',
  function($scope, ProductAPI, CategoryAPI, $ionicSlideBoxDelegate, $stateParams, CartAPI, pubSub, $dialog){
    $scope.queryParams = {
      style:'col'
    };
    pubSub.subscribe("tab.products.filterProduct", function(data){
      if(data.type){
        $scope.queryParams.categoryId = data.type;
      }
      for (var i = 0; i < $scope.categorys.length; i++) {
        var obj = $scope.categorys[i];
        if(obj.id = data.type){
          $scope.slideIndex = i;
        }
      }
      $scope.getProducts();
    });
    $scope.switchStyle = function(){
      if($scope.queryParams.style == 'row'){
        $scope.queryParams.style = 'col';
      }else{
        $scope.queryParams.style = 'row';
      }
    };
    $scope.labelQuery = function(label){
      $scope.queryParams.label = label;
      $scope.getProducts();
    };
    $scope.orderQuery = function(orderField){
      $scope.queryParams.label = null;
      $scope.queryParams.orderField = orderField;
      $scope.queryParams.isAsc = !$scope.queryParams.isAsc;
      $scope.getProducts();
    };
    $scope.getProducts = function(){
      ProductAPI.query({
        limit:100,
        offset:1,
        orderField:$scope.queryParams.orderField,
        isAsc:$scope.queryParams.isAsc,
        labels:[$scope.queryParams.label],
        categoryId:$scope.queryParams.categoryId
      }, function(data){
        $scope.products = data.data;
      })
    };
    $scope.categorys = [];
    $scope.getCategory = function(){
      CategoryAPI.query({}, function(data){
        $scope.categorys = data;
        $scope.categorys.unshift({name:"全部",nodes:null});
      })
    };
    //初始化
    $scope.slideIndex = 0;
    $scope.slideSecondIndex = 0;

    $scope.firstClick = function (index,item) {
      $scope.slideIndex = index;
      $scope.slideSecondIndex = 0;
      if(item.nodes && item.nodes.length > 0){
        $scope.queryParams.categoryId = item.nodes[0].id;
      }else{
        $scope.queryParams.categoryId = item.id;
      }
      $scope.getProducts();
    };
    $scope.secondClick = function (index,item){
      $scope.slideSecondIndex = index;
      $scope.queryParams.categoryId = item.id;
      $scope.getProducts();
    };
    $scope.pushCarts = function(item){
      item.number = 1;
      CartAPI.pushProduct({id:item.id, val: item});
      pubSub.publish('changeCart');
      $dialog.alert("商品［" +item.itemName+ "］已放入购物车");
    };
    var init = function(){
      $scope.getProducts();
      $scope.getCategory();
    };
    init();
  }]
});
