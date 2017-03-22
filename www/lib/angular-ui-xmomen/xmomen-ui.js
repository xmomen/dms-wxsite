// 使用相对路径必须该模块必须未在require的config中配置方可使用
define([
    "angular",
    "lib/angular-ui-xmomen/dialog",
    "lib/angular-ui-xmomen/validate"
],function(angular, dialog, validate){
    return angular.module("xmomen.ui",[
        //pagination.name,
        //uiDirective.name,
        dialog.name,
        //modal_draggable.name,
        //datetimepicker.name,
        //grid.name
        validate.name
    ]).factory('Resource', [ '$resource', '$injector', "$timeout", function( $resource , $injector, $timeout) {
        var $dialog;

        return function( url, params, methods ) {
            if(!$dialog){
                $dialog = $injector.get("$dialog");
            }
            var defaults = {
                query: {method: "GET", isArray: false},
                update: { method: 'PUT' },
                create: { method: 'POST' }
            };

            methods = angular.extend( defaults, methods );

            var resource = $resource('/api' + url, params, methods );

            resource.prototype.$save = function(success, fail) {
                var thisResource = this;
                return $dialog.confirm("是否保存数据？").then(function(){
                    if ( !thisResource.id ) {
                        return thisResource.$create(function(data,headers){
                            $dialog.success("新增成功");
                            success(data, headers);
                        }, fail);
                    }else {
                        return thisResource.$update(function(data,headers){
                            $dialog.success("更新成功");
                            success(data, headers);
                        }, fail);
                    }
                });
            };

            resource.prototype.$delete = function(success, fail) {
                var thisResource = this;
                $dialog.confirm("是否删除数据？").then(function(){
                    return thisResource.$delete(function(data,headers){
                        $dialog.success("删除成功");
                        success(data, headers);
                    }, function(data, headers){
                        if(fail){
                            fail(data.data, headers);
                        }
                    });
                })
            };

            resource.$export = function(option, success, fail) {
                $dialog.confirm("是否以当前查询条件导出数据（包含当前所有分页数据）？").then(function(){
                    var params = "";
                    if(option && option.data){
                        for(var p in option.data){
                            if(option.data[p]){
                                params += p + "=" + option.data[p] + "&";
                            }
                        }
                        params = "?"+params;
                    }
                    var anchor = angular.element("<iframe/>");
                    anchor.attr({
                        style:"display:none",
                        src: option.url + params,
                        onLoad:function(){
                            $dialog.success("已成功导出");
                            $timeout(function(){
                                anchor.remove();
                            },2000)
                        }
                    });
                    angular.element("body").append(anchor);
                })
            };

            resource.$upload = function(option, success, fail) {
                $dialog.confirm("是否导入文件？").then(function(){
                    Upload.upload(option).then(function (data) {
                        $dialog.success("文件上传成功");
                        success(data.data, data.headers);
                    }, function(data){
                        var anchor = angular.element("<iframe/>");
                        anchor.attr({
                            style:"display:none",
                            src: data.data.validResultUrl,
                            onLoad:function(){
                                $timeout(function(){
                                    anchor.remove();
                                },2000)
                            }
                        });
                        angular.element("body").append(anchor);
                        if(fail){
                            fail(data.data, data.headers);
                        }
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                })
            };

            return resource;
        };
    }]).factory("HttpInterceptor", ["$q", "$log", "$injector", function($q, $log, $injector){
        return {
            request: function (config) {
                if(config.method=='GET' && !config.cache){
                    if(config.params){
                        config.params._noCache = new Date().getTime();
                    }else{
                        config.params = {
                            _noCache : new Date().getTime()
                        }
                    }
                }
                return config;
            },
            responseError:function(response){
                var $dialog;
                if(!$dialog){
                    $dialog = $injector.get("$dialog");
                }
                $log.error("Response Error: ", response);
                if(response.status == 400){
                    $dialog.error(response.data.message);
                }else if(response.status == 401){
                    //未找到用户
                    window.location.reload();
                }else if(response.status == 500){
                    $dialog.error("系统操作异常，请联系管理员。");
                }
                return $q.reject(response);
            }
        }
    }]).config(["$httpProvider", function($httpProvider){
        $httpProvider.interceptors.push('HttpInterceptor');
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }]);
});
