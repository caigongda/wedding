// pages/styletmpl/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain:app.domain,
    curtemid:"",
    tmplarr: [],
    tmplclassarr:[],
    curclassid:"",
    //wedding_id:"",
    page:1,
    limit:10
  },
  selTmpl(e){
    var id=e.target.dataset.id;
    this.setData({
      curtemid: id
    })
    this.templList()
  },
  cardShare(e){
    //console.log(e)
    //wx.setStorageSync('tmpUrl', e.currentTarget.dataset.url)
    let that = this
    wx.navigateTo({
      //url: '../cardshare/index?url='+e.currentTarget.dataset.url+'&tmpid='+e.currentTarget.dataset.thid+'&wedid='+this.data.wedding_id,
      url: '../cardshare/index?tmpurl=' + e.currentTarget.dataset.url + '&url=' + e.currentTarget.dataset.url + '&tmpid=' + e.currentTarget.dataset.thid + '&preview=1'
    })
  },
  cardEdit(e) {
    console.log(e)
    return
    wx.navigateTo({
      //url: 'http://hy.jiefengtz.com',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  templClass(classid){
    var self=this;
    app.http("POST", "/api/template/templateClass", { class: classid}, function (res) {
      //console.log(res)
      self.setData({
        tmplclassarr: res.data.data,
        curtemid: 0
      });
      self.templList();
    })
  },
  templList(){
    var self = this;
    var querydata={
      class: this.data.curtemid,
      page:this.data.page,
      limit:this.data.limit
    };
    app.http("POST", "/api/template/Template", querydata, function (res) {
      //console.log(res)
      self.setData({
        tmplarr: res.data.data.template
      });

    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '风格模板',
    });
    //console.log(options)
    this.setData({
      curclassid: options.curclassid,
      //wedding_id: options.wedding_id
    });
    this.templClass(options.curclassid);
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