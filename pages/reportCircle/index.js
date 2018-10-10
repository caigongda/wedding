var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    imgList:[],
    curid:"1"
  },
  selReportImg(){
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var data = res.tempFilePaths;
        _this.uploadImg(res.tempFilePaths)
      }
    }) 
  },
  uploadImg(file){
    var _this=this;
    for(var i=0;i<file.length;i++){
      wx.uploadFile({
        url: 'http://hy.xiaolongshu.com/api/circle/upPicture', 
        filePath: file[i],
        name: 'imgs[]',
        formData: {
          'openid': app.globalData.personinfo.openid,
        },
        success(res) {
          const data = res.data;
          var result = JSON.parse(data);
          console.log(result);
          var imgList = _this.data.imgList;
          imgList = imgList.concat(result.data);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          _this.setData({
            imgList: imgList
          });
          //do something
        }
      })
    }
  },
  cancelImg(e){
    console.log()
    let imglist = this.data.imgList;
    let index=e.target.dataset.index;
    imglist.splice(index,1);
    this.setData({
      imgList: imglist
    })
  },
  changeVal(e){
    var kind=e.target.dataset.kind;
    var value = e.detail.value;
    switch (kind){
      case "title":
        this.setData({
          title: value
        })
      break;
      case "content":
        this.setData({
          content: value
        })
      break;
    };
  },
  report(){
    if (this.data.title==''){
      wx.showToast({
        icon:'none',
        title: '标题不能为空哦！',
      })
    } else if (this.data.content == ''){
      wx.showToast({
        icon: 'none',
        title: '内容不能为空哦！',
      })
    }else{
      var self = this;
      var formdata={
        openid: app.globalData.personinfo.openid,
        circleclass_id: +self.data.curid,
        title: self.data.title,
        article: self.data.content,
        images: self.data.imgList.join(",")
      }
      app.http("POST", "/api/circle/addArticle", formdata, function (res) {//圈子发布
        if (res.data.code==1){
          wx.showToast({
            icon: 'success',
            title: '添加成功',
          })
          let pages = getCurrentPages();  
          let prevPage = pages[ pages.length - 2 ]; 
          prevPage.setData({      
            curcircleid: self.data.curid
          });
          wx.navigateBack(1)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '圈子-发表',
    });
    this.data.curid = options.id;
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