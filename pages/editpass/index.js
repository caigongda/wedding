// pages/editpass/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpass:"",
    password:"",
    repass:"",
    tiptext:"",
    animationData:{}
  },
  iptoldpass(e){
    let data=e.target.dataset.index;
    let value = e.detail.value;
    let that=this;
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation = animation;
    switch (data){
      case "0":
      this.setData({
        oldpass: value
      });
      break;
      case "1":
      this.setData({
        password: value
      });
      break;
      case "2":
      this.setData({
        repass: value
      }, function () {
        this.animation = animation;
        if (that.data.repass != that.data.password
          && that.data.repass!='') {
          animation.scale(1).step();
          that.setData({
            tiptext: "两次输入密码不一致",
            animationData: animation.export()
          });
        } else {
          animation.scale(0).step();
          that.setData({
            tiptext: "",
            animationData: animation.export()
          });
        }
      });
      break;
    }
  },
  clearPass(e){
    var pass = e.target.dataset.pass;
    if (pass=="oldpass"){
      this.setData({
        oldpass: ""
      })
    } else if (pass == "password"){
      this.setData({
        password: ""
      })
    }else{
      this.setData({
        repass: ""
      })
    }
  },
  savepass() {
    if (this.data.password == "" || this.data.repass == "" || this.data.oldpass == "") {
      wx.showToast({
        title: '不能为空哦！',
        icon: "none",
        duration: 500
      })
    } else {
      wx.showLoading();
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      console.log(this.data)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '修改密码',
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