/**
 * Created by tanxinzheng on 17/3/3.
 */
define(['wechat-api'], function (wx) {
  return ['$scope', 'AppAPI', '$stateParams', '$ionicModal', '$ionicTabsDelegate', 'ProductAPI', 'pubSub', '$state', 'CartAPI', '$dialog', '$cookieStore',
    function ($scope, AppAPI, $stateParams, $ionicModal, $ionicTabsDelegate, ProductAPI, pubSub, $state, CartAPI, $dialog, $cookieStore) {
      $scope.currentCity = {};
      // 获取用户当前位置
      $scope.getLocation = function () {
        $scope.cityListModal.show();
        init();
      };
      $scope.goProducts = function (data) {
        $state.go('tab.product', data);
      };
      $scope.getQiangGouProducts = function () {
        ProductAPI.query({
          limit: 6,
          offset: 1,
          labels: ["xianShiQiangGou"]
        }, function (data) {
          $scope.qiangGouProducts = data.data;
        });
      };
      $scope.getXinPinProducts = function () {
        ProductAPI.query({
          limit: 6,
          offset: 1,
          labels: ["xinPinChangXian"]
        }, function (data) {
          $scope.xinPinProducts = data.data;
        });
      };
      $scope.getTuiJianProducts = function () {
        ProductAPI.query({
          limit: 6,
          offset: 1,
          labels: ["reMaiTuiJian"]
        }, function (data) {
          $scope.tuiJianProducts = data.data;
        });
      };
      $ionicModal.fromTemplateUrl('js/template/city-list.html', {
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
      $scope.getCurrentLocation = function () {
        wx.ready(function () {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var point = new BMap.Point(longitude, latitude);
              var gc = new BMap.Geocoder();
              gc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
                $scope.currentCity.cityName = addComp.city;
              });
            }
          });
        })
      };
      $scope.getLocalAddress = function(){
        wx.ready(function () {
          wx.openAddress({
            success: function (data) {
              console.log("用户成功拉出地址", data);
              //用户成功拉出地址
            },
            cancel: function (data) {
              // 用户取消拉出地址
              console.log("用户取消拉出地址", data);
            }
          });
        });
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
      var init = function () {
        $scope.getCurrentLocation();
        $scope.getQiangGouProducts();
        $scope.getXinPinProducts();
        $scope.getTuiJianProducts();
        $scope.getLocalAddress();
      };
      init();
    }]
});
