/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(){
  return ['$scope', 'AppAPI', '$stateParams', '$ionicModal', '$ionicTabsDelegate', function($scope, AppAPI, $stateParams, $ionicModal, $ionicTabsDelegate){
    // 获取用户当前位置
    $scope.getLocation = function(){
      console.log($ionicTabsDelegate)
      $scope.cityListModal.show();
      init();
      //$scope.locationInfo.name = "上海";
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

    var init = function(){
      //$scope.getLocation();
    };
    init();
  }]
});
