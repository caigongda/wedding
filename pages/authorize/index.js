const app = getApp();
const config = require("../../assets/js/config.js");
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAuth:false,
  },
  onLoad: function () {
    //console.log(1)
    var that = this;
    // 查看是否授权
    wx.login({
      //获取code
      success: function (res) {
        let code = res.code //返回code
        //console.log(code)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx824fcb56c9667971&secret=32118b157e1a1991ac4d91907f4d3d9d&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            //console.log(res)
            wx.setStorageSync(
              'openid', openid
            )
            //console.log(wx.getStorageSync('openid'))
            wx.getSetting({
              success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    success: function (res) {
                      //从数据库获取用户信息
                      //that.queryUsreInfo();
                      //用户已经授权过
                      console.log('成功授权');
                     
                      that.userLogin()
                      /* wx.switchTab({
                        url: '../index/index'
                      }) */
                    }
                  });
                }else{
                  that.setData({
                    isAuth: true
                  })
                }
              }
            })
          },
          fail: res =>{
            console.log('wxlogin失败')
            that.setData({
              isAuth: true
            })
          }
        })
      }
    })
    
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      getApp().globalData.userInfo = e.detail.userInfo
      //从数据库获取用户信息
      that.userLogin()
      wx.switchTab({
        url: '../index/index'
      }) 
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: app.globalData.urlPath + 'user/userInfo',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        getApp().globalData.userInfo = res.data;
      }
    })
  },
  //登陆与注册
  userLogin: function(){
    console.log('用户检测')
    console.log(getApp().globalData.userInfo)
    let openid = wx.getStorageSync('openid')
    let nickname = getApp().globalData.userInfo.nickName
    let avatar = getApp().globalData.userInfo.avatarUrl
    app.http("post", "/api/user/login", {openid: openid }, function (res) {
      //console.log(res)
      //self.globalData.personinfo = res.data.data.userinfo;
      if (res.data.code == 0) {
        app.http('post', "/api/user/register", { openid: openid, nickname: nickname, avatar: avatar }, function (res) {
          if(res.data.code == 1){
            console.log('成功注册')
            app.globalData.personinfo = res.data.data
            wx.switchTab({
              url: '../index/index',
            })
          }
          
        })
      } else {
        console.log('成功登陆');
        app.globalData.personinfo = res.data.data
          wx.switchTab({
            url: '../index/index',
          })
      }
    })
  },
  http: config.http,
})