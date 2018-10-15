// pages/search/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain:app.domain,
    SearchData:{
      value:""
    },
    page:1,
    limit:10,
    cicleConList:[]
  },
  SearchClear(){
    this.setData({
      ['SearchData.value']:""
    })
  },
  SearchInput(e) {
    var inputValue = e.detail.value;
    this.setData({
      ['SearchData.value']: inputValue
    });
  },
  circleDetail(e) {
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../circleDetail/index?item=' + JSON.stringify(item),
    })
  },
  SearchConfirm(e){
    if (e.target.dataset.key == 'back') {
      /*返回*/
      wx.navigateBack(1);
    }else{
      var querydata={
        sea: this.data.SearchData.value,
        page:this.data.page,
        limit: this.data.limit
      };
      app.http('get', "/api/circle/seaArticle",querydata, (res) => {
        console.log(res);
        this.setData({
          cicleConList:res.data.data.search
        })
      }, (err) => {
        console.log('请求错误信息：  ' + err.errMsg);
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
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