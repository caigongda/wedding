// pages/picture/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ambulList:[
      { src: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", name: "婚礼照片", count:"35"},
      { src: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", name: "婚礼照片", count: "35" },
      { src: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", name: "婚礼照片", count: "35" }
    ],
    page:1,
    limit:10
  },
  viewAlbum(e){
    wx.navigateTo({
      url: '../picalbum/index?id=' + e.target.dataset.ambulid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getAlbum(){//获取个人所有相册接口
    var querydata={
      openid: app.globalData.personinfo.openid
    };
    var self=this;
    app.http("POST", "/api/media/album", querydata, function (res) {//圈子发布
      if(res.data.code==1){
        self.setData({
          ambulList:res.data.data
        })
      }
    })
  },
  gettempAlbum(classid,wedid){
    var querydata = {
      openid: app.globalData.personinfo.openid,
      class: classid,
      wedding_id: wedid,
      page:this.data.page,
      limit:this.data.limit
    };
    var self = this;
    app.http("POST", "/api/wedding/getAlbum", querydata, function (res) {//圈子发布
      if (res.data.code == 1) {
        self.setData({
          ambulList: res.data.data.album
        })
      }
    })
  },
  onLoad: function (options) {
    var title = options.title;
    if (options.wedid==0){
      wx.setNavigationBarTitle({
        title: title,
      });
      this.getAlbum();
    }else{
      wx.setNavigationBarTitle({
        title: title,
      });
      this.gettempAlbum(options.classid,options.wedid);
    }
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