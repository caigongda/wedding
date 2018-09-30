// pages/styletmpl/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curtemid:"",
    tmplarr: [],
    tmplclassarr:[],
    curclassid:"",
    page:1,
    limit:10
  },
  selTmpl(e){
    var id=e.target.dataset.id;
    this.setData({
      curtemid: id
    })
  },
  cardShare(){
    wx.navigateTo({
      url: '../cardshare/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  templClass(classid){
    var self=this;
    app.http("POST", "/api/template/templateClass", { class: classid}, function (res) {//圈子分类
      self.setData({
        tmplclassarr: res.data.data,
        curtemid: res.data.data[0].id
      });
      self.templList();
    })
  },
  templList(){
    var self = this;
    var querydata={
      class: +this.data.curtemid,
      page:this.data.page,
      limit:this.data.limit
    };
    app.http("POST", "/api/template/Template", querydata, function (res) {//圈子分类
      self.setData({
        tmplarr: res.data.data
      });

    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '风格模板',
    });
    this.setData({
      curclassid: options.id
    });
    this.templClass(options.id);
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