/**
 * Created by tanxinzheng on 17/3/21.
 */
define(['wechat-api'], function(wx){
  var sign = require('wechat-api-sign');
  var config = sign('jsapi_ticket', 'http://example.com');
  console.log(config);
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx02f22c6f677aa7bf', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [
      'getLocation',
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
});

