// pages/cardshare/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain : app.domain,
    url : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,"aaa")
    wx.setNavigationBarTitle({
      title: '电子请柬分享',
    })
    let url = ''
    if(options.preview == 1){
      url = this.data.domain + options.tmpurl + '?preview=1&tmpid=' + options.tmpid
    }else{
      url = this.data.domain + options.tmpurl + '?tmpid=' + options.tmpid + '&wedid=' + options.wedid + '&openid=' + wx.getStorageSync('openid')
    }
    this.setData({
      url: url
    })
  },

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
  onShareAppMessage: function () {
  
  }
})