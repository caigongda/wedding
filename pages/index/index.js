//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
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
    app.http("get", "/api/main/mainBanner", {}, function (res) {//轮播图
      self.setData({
        imgUrls: res.data.data,
      })
    })
    app.http("get", "/api/main/mainClass", {}, function (res) {//首页分类
      self.setData({
        moduleList: res.data.data,
      })
    })
  },
})
