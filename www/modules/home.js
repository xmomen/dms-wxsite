/**
 * Created by tanxinzheng on 17/3/3.
 */
define(['wechat-api', 'wechat-api-sign'], function(wx){
  return ['$scope', 'AppAPI', '$stateParams', '$ionicModal', '$ionicTabsDelegate', 'ProductAPI', 'pubSub', '$state',
  function($scope, AppAPI, $stateParams, $ionicModal, $ionicTabsDelegate, ProductAPI, pubSub, $state){
    $scope.currentCity = {};
    // 获取用户当前位置
    $scope.getLocation = function(){
      $scope.cityListModal.show();
      init();
      //$scope.locationInfo.name = "上海";
    };
    $scope.goProducts = function(data){
      pubSub.publish("tab.products.filterProduct",{
        type:data.type
      });
      $state.go('tab.product');
    };
    $scope.getQiangGouProducts = function(){
      ProductAPI.query({
        limit:6,
        offset:1,
        labels:["xianShiQiangGou"]
      }, function(data){
        $scope.qiangGouProducts = data.data;
      });
    };
    $scope.getXinPinProducts = function(){
      ProductAPI.query({
        limit:6,
        offset:1,
        labels:["xinPinChangXian"]
      }, function(data){
        $scope.xinPinProducts = data.data;
      });
    };
    $scope.getTuiJianProducts = function(){
      ProductAPI.query({
        limit:6,
        offset:1,
        labels:["reMaiTuiJian"]
      }, function(data){
        $scope.tuiJianProducts = data.data;
      });
    };
    $ionicModal.fromTemplateUrl('js/template/city-list.html', {
      //id: 'cityList',
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.cityListModal = modal;
    });

    $scope.closeCityListModal = function () {
      $scope.cityListModal.hide();
    };
    $scope.currentCityChange = function (data) {
      $scope.closeCityListModal();
      $scope.currentCity = {
        cityName: data
      };
    };
    function init(){
      var startY = 0; // ��ʼλ��
      var lastY = 0; // ��һ��λ��
      var indicator =document.getElementById("indicator");
      indicator.addEventListener('touchstart', function(e) {
        lastY = startY = e.touches[0].pageY;
        console.log(lastY+"start");
      });
      indicator.addEventListener('touchmove', function(e) {
        var nowY = e.touches[0].pageY;
        var moveY = nowY - lastY;
        var contentTop = content.style.top.replace('px', '');
        // ����topֵ�ƶ�content
        content.style.top = (parseInt(contentTop) + moveY) + 'px';
        lastY = nowY;
        console.log(lastY+"move");
      });
      indicator.addEventListener('touchend', function(e) {
        // do touchend
        var nowY = e.touches[0].pageY;
        var moveY = nowY - lastY;
        var contentTop = content.style.top.replace('px', '');
        // ����topֵ�ƶ�content
        content.style.top = (parseInt(contentTop) + moveY) + 'px';
        lastY = nowY;
        console.log(lastY+"end");
      });
    }
    $scope.getCurrentLocation = function(){
        wx.ready(function () {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度
              // 地址解析:http://lbs.qq.com/javascript_v2/guide-service.html#link-four
              var map = new BMap.Map("allmap");
              var point = new BMap.Point(longitude,latitude);
              var gc = new BMap.Geocoder();
              gc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                $scope.currentCity.cityName = addComp.city;
              });
            }
          //});
        });
      })
    };
    var init = function(){
      $scope.getCurrentLocation();
      $scope.getQiangGouProducts();
      $scope.getXinPinProducts();
      $scope.getTuiJianProducts();
    };
    init();
  }]
});
