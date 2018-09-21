/**
  * methods： 请求方式
  * url: 请求地址
  * data： 要传递的参数
  * callback： 请求成功回调函数
  * errFun： 请求失败回调函数
  */
function appRequest(methods, url, data, callback, errFun) {
  wx.request({
    url: url,
    method: methods,
    header: {
      'content-type': methods == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
    },
    dataType: 'json',
    data: data,
    success: function (res) {
      callback(res);
    },
    fail: function (err) {
      errFun(err);
    }
  })
};
const api={
  search:"https://tcc.taobao.com/cc/json/mobile_tel_segment.htm",
};
module.exports={
  http: appRequest,
  api:api
}
