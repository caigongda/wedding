//app.js
const config=require("./assets/js/config.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

/*     var openid = ''
    var nickname = ''
    var avatar = ''
    //授权
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
            openid = res.data.openid //返回openid
            //console.log(res)
            var self = this;
            //获取用户资料
            var loginStatus = true;
              if (!loginStatus) {
                wx.openSetting({
                  success: function (data) {
                    if (data) {
                      if (data.authSetting["scope.userInfo"] == true) {
                        loginStatus = true;
                        wx.getUserInfo({
                          withCredentials: false,
                          success: function (data) {
                            console.info("2成功获取用户返回数据");
                            console.info(data.userInfo);
                          },
                          fail: function () {
                            console.info("2授权失败返回数据");
                          }                });
                      }
                    } 
                  },
                  fail: function () {
                    console.info("设置失败返回数据");
                  }        });
              } else {
                wx.login({
                  success: function (res) {
                    if (res.code) {
                      wx.getUserInfo({
                        withCredentials: false,
                        success: function (data) {
                          console.info("1成功获取用户返回数据");
                          console.info(data.userInfo);
                        },
                        fail: function () {
                          console.info("1授权失败返回数据");
                          loginStatus = false;
                          // 显示提示弹窗
                          wx.showModal({
                            title: '提示标题',
                            content: '提示内容',
                            success: function (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                wx.openSetting({
                                  success: function(res){
                                    console.log(res)
                                  },
                                  error:res=>{
                                    console.log(res)
                                  }
                                })
                              } else if (res.cancel) {
                                wx.openSetting({
                                  success: function (data) {
                                    if (data) {
                                      if (data.authSetting["scope.userInfo"] == true) {
                                        loginStatus = true;
                                        wx.getUserInfo({
                                          withCredentials: false,
                                          success: function (data) {
                                            console.info("3成功获取用户返回数据");
                                            console.info(data.userInfo);
                                          },
                                          fail: function () {
                                            console.info("3授权失败返回数据");
                                          }                                });
                                      }
                                    } 
                                  },
                                  fail: function () {
                                    console.info("设置失败返回数据");
                                  }                        });
                              }
                            }
                          });
                        }              });
                    }
                  },
                  fail: function () {
                    console.info("登录失败返回数据");
                  }       });
              }
            



                
            //return false
            
            
            config.http("post", "/api/user/login", { openid: openid }, function (res) {
              //console.log(res)
              //self.globalData.personinfo = res.data.data.userinfo;
              if(res.data.code == 0){
                config.http('post',"/api/user/register",{openid:openid,nickname:nickname,avatar:avatar},function(res){
                  console.log(res)
                })
              }else{
                console.log('成功登陆')
              }
            })

          }
        })


      }
    })   */




    // 登录
    wx.login({
      success: res => {
       var self=this;
        config.http("post", "/api/user/login", { openid: "test004"}, function (res) {
          console.log(res,"cgd");
          self.globalData.personinfo=res.data.data.userinfo;
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }) 
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => {
        wx.openSetting({
          success: res => {
            console.log(res)
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    personinfo:null
  },
  api: config.api,
  http:config.http,
})