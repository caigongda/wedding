// pages/circle/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain,
    issearch:false,
    query:{
      title:"haha"
    },
    activeTab:"0",
    arraylist:[],
    cicleConList:[],
    isscrollup:false,
    isscrolldown: false,
    curcircleid:0,
    page:1,
    limit:10
  },
  showSearch(){
    wx.navigateTo({
      url: '../search/index'
    })
  },
  cirSearch(){
    console.log(this.data.query.title,"aaa")
  },
  sellegend(e){
    this.setData({
      activeTab: e.currentTarget.dataset.index,
      curcircleid: e.currentTarget.dataset.id
    });
    this.firstClick(e.currentTarget.dataset.id);
  },
  report(){
    wx.navigateTo({
      url: '../reportCircle/index?id=' + this.data.curcircleid,
    })
  },
  circleDetail(e){
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../circleDetail/index?item=' + JSON.stringify(item),
    })
  },
  refresh(){
    this.setData({
      isscrollup:true,
    });
    this.firstClick(this.data.curcircleid);
  },
  loadMore() {
    //console.log("aa")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  initPage(){
    var self=this;
    app.http("get", "/api/circle/circleClass", {}, function (res) {//圈子分类
      var redata = res.data.data;
      if (redata.length!=0){
        self.setData({
          arraylist: redata
        });
        self.firstClick(0);
      }
    })
  },
  firstClick(id){
    var self = this;
    var queryparam = {
      class: +id,
      page: this.data.page,
      limit: this.data.limit
    };
    app.http("POST", "/api/circle/circleArticle", queryparam, function (res) {//圈子分类文章
      //console.log(res.data.data.article,"aaa") 
      self.setData({
        cicleConList: res.data.data.article,
        isscrollup: false,
      })
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '圈子'
    });
    this.initPage();
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
    this.firstClick(this.data.curcircleid);
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