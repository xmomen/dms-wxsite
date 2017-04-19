/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'ProductAPI', 'CategoryAPI', '$ionicSlideBoxDelegate', '$stateParams', 'CartAPI', 'pubSub', '$dialog','$cookieStore',
  function($scope, ProductAPI, CategoryAPI, $ionicSlideBoxDelegate, $stateParams, CartAPI, pubSub, $dialog, $cookieStore){
    $scope.queryParams = {
      style:'col'
    };
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
      var labels = [];
      if($scope.queryParams.label){
        labels = [$scope.queryParams.label];
      }
      ProductAPI.query({
        limit:100,
        offset:1,
        keyword:$scope.queryParams.keyword,
        orderField:$scope.queryParams.orderField,
        isAsc:$scope.queryParams.isAsc,
        labels: labels,
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
      var member = $cookieStore.get('member');
      CartAPI.create({
        memberId:member.memberId,
        itemId:item.id
      }, function(){
        $dialog.alert("商品［" +item.itemName+ "］已放入购物车");
        pubSub.publish('changeCart');
      });
    };
    var init = function(){
      if($stateParams.keyword){
        $scope.queryParams.keyword = $stateParams.keyword;
      }
      if($stateParams.type){
        $scope.queryParams.categoryId = $stateParams.type;
      }
      if($stateParams.label){
        $scope.queryParams.label = $stateParams.label;
      }
      for (var i = 0; i < $scope.categorys.length; i++) {
        var obj = $scope.categorys[i];
        if(obj.id == data.type){
          $scope.slideIndex = i;
        }
      }
      $scope.getProducts();
      $scope.getCategory();
    };
    init();
  }]
});
