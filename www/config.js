/**
 * Created by tanxinzheng on 16/8/11.
 */
require.config({
    baseUrl:"./",
    paths: {
        "jquery":"lib/jquery/dist/jquery",
        "ionic":"lib/ionic/js/ionic",
        "ionic-angular":"lib/ionic/js/ionic-angular",
        "angular": "lib/angular/angular",
        "angularAMD": "lib/angularAMD/angularAMD",
        "angular-ui-router": "lib/angular-ui-router/release/angular-ui-router",
        "permission":"lib/angular-permission/dist/angular-permission",
        "angular-translate":"lib/angular-translate/angular-translate",
        "angular-resource":"lib/angular-resource/angular-resource",
        "angular-sanitize":"lib/angular-sanitize/angular-sanitize",
        "angular-animate":"lib/angular-animate/angular-animate",
        "jquery.validate":"lib/jquery-validation/dist/jquery.validate",
        //"jquery.validate.local":"lib/jquery-validation/src/localization/messages_zh",
        "ui-bootstrap-tpls":"lib/angular-bootstrap/ui-bootstrap-tpls.min",

        "angular-ui-xmomen":"lib/angular-ui-xmomen/xmomen-ui",

        "app-module": "js/app.module",
        "main":"main"
    },
    shim: {
        "permission" : ["angular"],
        "angular": { exports: "angular" },
        "ionic": ['angular'],
        "ionic-angular": ["angular", "ionic" ],
        "angularAMD": ["angular"],
        "angular-ui-router": ["angular"],
        "ui-bootstrap-tpls": ["angular"],
        "angular-resource": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-animate": ["angular"],
        "angular-translate": ["angular"],
        //"jquery.validate.local":["jquery.validate"],
        "jquery.validate":["jquery"],
        "angular-ui-xmomen":[
          //"jquery.validate.local",
          "jquery.validate",
          "ui-bootstrap-tpls"
        ],
        "main": [
            //"jquery.validate.local",
            //"jquery.validate",
            "ui-bootstrap-tpls",
            "angular-ui-xmomen",
            "ionic",
            "ionic-angular",
            "angular-resource",
            "angular-animate",
            "angular-ui-router",
            "angular",
            "angularAMD",
            "permission",
            'angular-sanitize',
            "app-module"
        ]
    }
});
