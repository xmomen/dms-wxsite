'use strict';
/**
 * dialog框架
 */
define(function(toaster){
    return angular.module('xmomen.dialog', [
    ]).factory("$dialog", ["$q","$injector", "$ionicPopup", function ($q, $injector, $ionicPopup) {
        if(!$modal){
          $modal = $injector.get("$uibModal");
        }
        var $modal;
        return {
            alert : function(option){
                var defaultConfig = {
                    type: "info",
                    title : "提示",
                    timeout: 2000
                };
                if(!angular.isObject(option)){
                    option = {
                        text:option
                    }
                }
                //type, title, body, timeout, bodyOutputType, clickHandler)
                angular.extend(defaultConfig, option);
                var alertPopup = $ionicPopup.alert({
                  title: '提示',
                  okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                  okType: 'button-small button-assertive',
                  template: option.text
                });
                alertPopup.then(function(res) {
                  console.log('Thank you for not eating my delicious ice cream cone');
                });
            },
            success : function(option){
                var defaultConfig = {
                    type: "success",
                    title : "提示",
                    timeout: 2000
                };
                if(!angular.isObject(option)){
                    option = {
                        text:option
                    }
                }
                //type, title, body, timeout, bodyOutputType, clickHandler)
                angular.extend(defaultConfig, option);
                toaster.pop(defaultConfig.type, defaultConfig.title, defaultConfig.text, defaultConfig.timeout, defaultConfig.bodyOutputType, defaultConfig.clickHandler);
            },
            error : function(option){
                var defaultConfig = {
                    type: "error",
                    title : "提示",
                    timeout: 2000
                };
                if(!angular.isObject(option)){
                    option = {
                        text:option
                    }
                }
                //type, title, body, timeout, bodyOutputType, clickHandler)
                angular.extend(defaultConfig, option);
                toaster.pop(defaultConfig.type, defaultConfig.title, defaultConfig.text);
            },
            warn : function(option){
                var defaultConfig = {
                    type: "warning",
                    title:"警告",
                    timeout : 2000
                };
                if(!angular.isObject(option)){
                    option = {
                        content:option
                    }
                }
                angular.extend(defaultConfig, option);
                toaster.pop(defaultConfig.type, defaultConfig.title, defaultConfig.text);
            },
            confirm: function (option) {
                var deferred = $q.defer();
                var defaultConfig = {
                    title:"确认框",
                    color : "#C46A69",
                    icon : "fa fa-warning shake animated",
                    timeout : 6000
                };
                if(!angular.isObject(option)){
                    option = {
                        content:'<span style="font-size: 14px;">' + option + '</span>'
                    }
                }
                angular.extend(defaultConfig, option);
                $ionicPopup.confirm({
                  title: defaultConfig.title,
                  cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字。
                  //cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
                  okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                  //okType: '', // String (默认: 'button-positive')。OK按钮的类型。
                  template: defaultConfig.content
                }).then(function (res) {
                    if(res) {
                      deferred.resolve();
                    }else{
                      deferred.reject();
                    }
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }
    }])
});
