// pages/weddetail/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain:app.domain,
    openid: wx.getStorageSync('openid'),
    indexclass:"",
    imgList: [],
    page:1,
    limit:10,
    tmpurl : '/template1'
  },
  viewalbum(){
    wx.navigateTo({
      url: '../picture/index?title=个人相册'+ "&wedid=0&classid="+this.data.indexclass,
    })
  },
  takephoto(){
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var imgList = _this.data.imgList;
        imgList.push(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.uploadImg(res.tempFilePaths);
      }
    })  
  },
  uploadImg(file) {
    var _this = this;
    for (var i = 0; i < file.length; i++) {
      wx.uploadFile({
        url: app.domain + '/api/Wedding/upPicture',
        filePath: file[i],
        name: 'imgs[]',
        formData: {
          'openid': wx.getStorageSync('openid'),
          'class' : this.data.indexclass,
          'wedding_id' : -1
        },
        success(res) {
          const data = res.data;
          var result = JSON.parse(data);
          var imgList = _this.data.imgList;
          imgList = imgList.concat(result.data);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          _this.setData({
            imgList: imgList
          });
          wx.navigateTo({
            url: '../picture/index?title=个人相册' + "&wedid=-1&classid=" + _this.data.indexclass,
          })
          //do something
        }
      })
    }
  },
  selStyleTmpl(){
    wx.navigateTo({
      url: '../styletmpl/index?curclassid=' + this.data.indexclass,
    })
  },
  selCardInfo() {
    wx.navigateTo({
      url: '../cardinfo/index?id=' + this.data.indexclass,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  initpage(){//获取请帖列表
    var self = this;
    var querydata = {
      openid: wx.getStorageSync('openid'),
      class: this.data.indexclass,
      page: this.data.page,
      limit: this.data.limit,
    };
    app.http("POST", "/api/wedding/Wedding", querydata, function (res) {//婚庆列表
      //console.log(res,"12")
      self.setData({
        imgList: res.data.data.wedding
      })
      console.log(self.data.imgList)
    })
  },
  cardShare(e){
    wx.navigateTo({
      url: '../cardshare/index?openid=' + this.data.openid + '&tmpurl=' + this.data.tmpurl + '&tmpid=' + e.currentTarget.dataset.tmpid + '&preview=0&wedid=' + e.currentTarget.dataset.thid
    })
  },
  onLoad: function (options) {
    //console.log(options)
    this.setData({
      indexclass: options.id
    });
    wx.setNavigationBarTitle({
      title: options.name,
    });
    this.initpage();
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