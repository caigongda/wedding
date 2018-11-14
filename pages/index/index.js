//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    domain:app.domain,
    imgUrls: [],
    moduleList:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  wedDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '../weddetail/index?id=' + e.target.dataset.id + "&name=" + e.target.dataset.name,
    })
  },
  birthDetail(){
    wx.navigateTo({
      url: '../cardinfo/index',
    })
  },
  elecCard(){
    wx.navigateTo({
      url: '../styletmpl/index',
    })
  },
  onLoad: function (options) {
    var self=this;
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 2000
    })
    app.http("get", "/api/main/mainBanner", {}, function (res) {//轮播图
      //console.log(res.data)
      self.setData({
        imgUrls: res.data.data,
      })
    })
    app.http("get", "/api/main/mainClass", {}, function (res) {//首页分类
      self.setData({
        moduleList: res.data.data,
      });
      wx.hideToast();
    })
  },
})
