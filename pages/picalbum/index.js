// pages/picalbum/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    page:1,
    limit:10
  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.src;
    wx.previewImage({
      current: index,     //当前图片地址
      urls: [index],               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  initAmbul(classid){
    var querydata = {
      openid: app.globalData.personinfo.openid,
      class:classid,
      page:this.data.page,
      limit:this.data.limit
    };
    var self = this;
    app.http("POST", "/api/media/Picture", querydata, function (res) {//圈子发布
      console.log(res.data.data.picture)
      if (res.data.code == 1) {
        self.setData({
          imgList: res.data.data.picture
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title = options.title
    wx.setNavigationBarTitle({
      title: title,
    });
    var id=options.id;
    this.initAmbul(id);
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