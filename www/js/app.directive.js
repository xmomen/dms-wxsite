define(function (require) {
  var angular = require('angular');
  function SimplePubSub() {
    var events = {};
    return {
      on: function(names, handler) {
        names.split(' ').forEach(function(name) {
          if (!events[name]) {
            events[name] = [];
          }
          events[name].push(handler);
        });
        return this;
      },
      trigger: function(name, args) {
        angular.forEach(events[name], function(handler) {
          handler.call(null, args);
        });
        return this;
      }
    };
  }
  angular.module('app.directive', [])
    .directive('btnLoading', [function() {
      return {
        restrict: 'A',
        link: function(scope, el, attr) {
          var defaultLoadingText = attr.btnLoadingText;
          if(!defaultLoadingText){
            defaultLoadingText = "<i class='icon-refresh'>&nbsp;稍等</i>"
          }
          scope.prevText = el.html();
          scope.$watch(function(){
            return scope.$eval(attr.btnLoading)
          }, function(value){
            if(angular.isDefined(value)){
              if(value){
                el.attr("disabled", true);
                el.html(defaultLoadingText);
              }else{
                el.removeAttr("disabled");
                el.html(scope.prevText);
              }
            }
          })
        }
      }
    }])
    .directive('cityListBox', function ($timeout,$ionicScrollDelegate) {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          var events = scope.events;
          events.on('cityboxlinkclick', function(obj){
            var id = obj.data.attr('href');
            var el = document.querySelector(id);
            if(el){
              var scrollPosition= el.offsetTop;
              $ionicScrollDelegate.scrollTo(0,scrollPosition);
            }
          });
        },
        controller : function($rootScope,$scope, $attrs, $element) {
          $scope.events = new SimplePubSub();
          $scope.$on('cityboxlinkclick', function(e,data) {
            $scope.events.trigger("cityboxlinkclick", {"event" : e,"data":data});
          });
          $scope.$on('selectedCity', function(e,data) {
            $scope.currentCityChange(data);
          });
        }
      }
    })
    .directive('cityboxLink',function(){
      return {
        restrict: 'A',
        link:function(scope,element,attr){
          element.bind('click',function(e){
            e.preventDefault();
            scope.$emit('cityboxlinkclick',element);
          })
        }
      }
    })
    .directive('cityboxSelect',function(){
      return {
        restrict: 'A',
        link:function(scope,element,attr){
          element.bind('click',function(e){
            e.preventDefault();
            if(e.target.nodeName  == 'A'){
              scope.$emit('selectedCity',e.target.text);
            }
          })
        }
      }
    })

});
