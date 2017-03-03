/**
 * Created by tanxinzheng on 17/1/14.
 */
//mockAPI.js

var fs = require('fs');
var path = require('path');

var mockbase = path.join(__dirname, 'api');

var response = function(res, file){
    var data = fs.readFileSync(path.join(mockbase, file), 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
};

var mockApi = function(res, pathname, paramObj, next) {
    switch (pathname) {
        case '/account':
            response(res, 'account.json');
            return ;
        case '/user':
            response(res, 'user.json');
            return ;
        case '/address':
          response(res, 'address.json');
          return ;
        case '/account/permissions':
            response(res, 'account/permissions.json');
            return ;
        default:
            ;
    }
    next();
};

module.exports = mockApi;
