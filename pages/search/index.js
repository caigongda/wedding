// pages/search/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SearchData:{
      value:"大大"
    }
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
  SearchConfirm(e){
    console.log(e,e.target.dataset.key, app.api.search)
    if (e.target.dataset.key == 'back') {
      /*返回*/
      wx.navigateBack(1);
    }else{
      app.http('post', app.api.search, { tel: '17771806167' }, (res) => {
        console.log(res)
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