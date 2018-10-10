// pages/person/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg:"",
    username:"",
    usertel:""
  },
  editPass(){
    wx.navigateTo({
      url: '../editpass/index',
    })
  },
  openPicture(e){
    var dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../picture/index?title=' + dataset.title + "&wedid=" + dataset.wedid,
    })
  },
  helpNote(){
    wx.navigateTo({
      url: '../helpnote/index',
    })
  },
  onlineCon(){
        wx.makePhoneCall({
          phoneNumber: '17771806167' 
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    });
    this.setData({
      userimg: app.globalData.personinfo.avatar,
      username: app.globalData.personinfo.nickname,
      usertel: app.globalData.personinfo.mobile
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