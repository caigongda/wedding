// pages/circle/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issearch:false,
    query:{
      title:"haha"
    },
    activeTab:"0",
    arraylist:[
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" },
      { name: "精选" }
    ],
    isscrollup:false,
    isscrolldown: false
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
      activeTab: e.target.dataset.index
    })
  },
  report(){
    wx.navigateTo({
      url: '../reportCircle/index',
    })
  },
  circleDetail(){
    wx.navigateTo({
      url: '../circleDetail/index',
    })
  },
  refresh(){
    this.setData({
      isscrollup:true,
    });
    setTimeout(_=>{
      this.setData({
        isscrollup: false,
      });
    },1000)
  },
  loadMore() {
    console.log("aa")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '圈子'
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