// pages/cardinfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manname:"",
    womanname:"",
    wedtime:"",
    wedplace:""
  },
  iptMan(e){
    var inputValue = e.detail.value;
    this.setData({
      manname: inputValue
    });
  },
  iptWoman(e) {
    var inputValue = e.detail.value;
    this.setData({
      womanname: inputValue
    });
  },
  iptTime(e) {
    var inputValue = e.detail.value;
    this.setData({
      wedtime: inputValue
    });
  },
  iptPlace(e) {
    var inputValue = e.detail.value;
    this.setData({
      wedplace: inputValue
    });
  },
  create(){
    if (this.data.manname==""||
      this.data.womanname ==""||
      this.data.wedtime == "" ||
      this.data.wedplace == ""){
        wx.showToast({
          icon:"none",
          title: '不能为空哦！',
        })
    }else{

    }
  },
  saveEdit(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '请帖信息',
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