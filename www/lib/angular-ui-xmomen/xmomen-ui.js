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
    ]).factory("HttpInterceptor", ["$q", "$log", "$injector", function($q, $log, $injector){
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
                    $dialog.alert(response.data.message);
                }else if(response.status == 401){
                    //未找到用户
                    window.location.reload();
                }else if(response.status == 500){
                    $dialog.alert("系统操作异常，请联系管理员。");
                }
                return $q.reject(response);
            }
        }
    }]).config(["$httpProvider", function($httpProvider){
        $httpProvider.interceptors.push('HttpInterceptor');
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }]);
});
