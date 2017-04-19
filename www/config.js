/**
 * Created by tanxinzheng on 16/8/11.
 */
require.config({
    baseUrl:"./",
    paths: {
        "jquery":"lib/jquery/dist/jquery",
        "ionic":"lib/ionic/js/ionic",
        "ionic-angular":"lib/ionic/js/ionic-angular",
        "ionic-datepicker":"lib/ionic-datepicker/dist/ionic-datepicker.bundle.min",
        //"ionic-datepicker-service":"lib/ionic-datepicker/src/ionic-datepicker.bundle.min",
        //"ionic-datepicker-provider":"lib/ionic-datepicker/dist/ionic-datepicker.bundle.min",
        "angular": "lib/angular/angular",
        "angularAMD": "lib/angularAMD/angularAMD",
        "angular-ui-router": "lib/angular-ui-router/release/angular-ui-router",
        "permission":"lib/angular-permission/dist/angular-permission",
        "permission-ui":"lib/angular-permission/dist/angular-permission-ui",
        "angular-translate":"lib/angular-translate/angular-translate",
        "angular-local-storage":"lib/angular-local-storage/dist/angular-local-storage",
        "angular-resource":"lib/angular-resource/angular-resource",
        "angular-sanitize":"lib/angular-sanitize/angular-sanitize",
        "angular-animate":"lib/angular-animate/angular-animate",
        "angular-cookies":"lib/angular-cookies/angular-cookies.min",
        "angular-pub-sub":"lib/angular-pub-sub/dist/angular-pub-sub",
        "jquery.validate":"lib/jquery-validation/dist/jquery.validate",
        //"jquery.validate.local":"lib/jquery-validation/src/localization/messages_zh",
        "ui-bootstrap-tpls":"lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "wechat-api":"lib/wechat/jweixin",
        "wechat-api-config":"lib/wechat/weixin.config",
        "angular-ui-xmomen":"lib/angular-ui-xmomen/xmomen-ui",

        "app-module": "js/app.module",
        "main":"main"
    },
    shim: {
        "permission" : ["angular"],
        "angular": { exports: "angular" },
        "ionic": ['angular'],
        "ionic-angular": ["angular", "ionic" ],
        "ionic-datepicker": ["angular", "ionic" ],
        "angularAMD": ["angular"],
        "angular-ui-router": ["angular"],
        "ui-bootstrap-tpls": ["angular"],
        "permission-ui" : ['permission'],
        "angular-resource": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-animate": ["angular"],
        "angular-local-storage": ["angular"],
        "angular-translate": ["angular"],
        "angular-cookies" : ["angular"],
        "angular-pub-sub": ["angular"],
        //"jquery.validate.local":["jquery.validate"],
        "jquery.validate":["jquery"],
        "wechat-api":{
          exports:"wx"
        },
        "wechat-api-config":["wechat-api"],
        "angular-ui-xmomen":[
          //"jquery.validate.local",
          "jquery.validate",
          "ui-bootstrap-tpls"
        ],
        "main": [
            //"jquery.validate.local",
            //"jquery.validate",
            "angular-local-storage",
            "permission-ui",
            "permission",
            "wechat-api",
            "ui-bootstrap-tpls",
            "angular-ui-xmomen",
            "ionic",
            "ionic-angular",
            "ionic-datepicker",
            "angular-resource",
            "angular-pub-sub",
            "angular-animate",
            "angular-cookies",
            "angular-ui-router",
            "angular",
            "angularAMD",
            "permission",
            'angular-sanitize',
            "app-module"
        ]
    }
});
