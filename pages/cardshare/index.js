// pages/cardshare/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain : app.domain,
    url : '',
    shareUrl : '',
    title : '分享测试'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: '电子请柬分享',
    })
    let url = ''

    if(options.preview == 1){
      url = this.data.domain + options.tmpurl + '?preview=1&tmpid=' + options.tmpid
    } else if (options.preview == 0){
      url = this.data.domain + options.tmpurl + '?tmpid=' + options.tmpid + '&wedid=' + options.wedid + '&openid=' + wx.getStorageSync('openid')
      this.setData({
        shareUrl: '/pages/cardshare/?_url=' + this.data.domain + options.tmpurl + '&wedid=' + options.wedid + '&share=1&preview=2'
      })
    }else{
      url = options._url + '/?wedid=' + options.wedid +  '&share=1'
    }
    this.setData({
      url: url
    })
  },


  onShareAppMessage: function (res) {
    let that = this
    if(res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    } else {
      console.log("来自右上角转发菜单")
    }
    console.log(that.data.shareUrl)
    return {
      title: "ceshi",
      path: that.data.shareUrl,
      success: function (res) {
        // 转发成功
        console.log('转发成功')
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
      } 
    }
  },

/*   onShareAppMessage: function (options) {

    //console.log(options);

    return {

      title: '25小时网',

      desc: '佛山第一生活门户',

      path: '/pages/index/index?url=' + encodeURIComponent(options.webViewUrl),

    }

  }, */



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  /* onShareAppMessage: function () {
  
  } */
})