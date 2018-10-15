// pages/cardinfo/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manname:"",
    womanname:"",
    wedtime:"",
    wedplace:"",
    classid:"",
    wedding_id:""
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
  selplace(e){
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        _this.setData({
          wedplace: res.address,
        })
      },
      fail: function (err) {
        console.log(err)
      }
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
      var querydata={
        openid: app.globalData.personinfo.openid,
        class:this.data.classid,
        groom: this.data.manname,
        bride: this.data.womanname,
        time: this.data.wedtime,
        address: this.data.wedplace
      };
      app.http('POST', "/api/wedding/createWedding1", querydata, (res) => {
        console.log(res);
        //传递首页id和请帖id到 选择模板界面
        this.setData({
          wedding_id: res.data.data.id
        })
        wx.navigateTo({
          url: '../styletmpl/index?curclassid=' + this.data.classid + '&wedding_id=' + this.data.wedding_id,
        })
      }, (err) => {
        console.log('请求错误信息：  ' + err.errMsg);
      });
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
    this.setData({
      classid: options.id
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