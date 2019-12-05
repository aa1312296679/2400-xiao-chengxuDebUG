// pages/My/advice/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentData: {
      uid: null,
      content: '',
      image: []
    },
    images: []
  },
  bindFormSubmit(e) {
    let that = this
    this.data.contentData.content = e.detail.value.content
    app.request({
      url: '/content/api/opinion',
      data: that.data.contentData
    }).then(res => {
     if (res.code === 1) {
       wx.showToast({
         title: '感谢您的反馈~',
       })
       that.setData({
         ['contentData.content']: '',
         ['contentData.image']: [],
         images: []
       })
     }
    })
  },
  uploadImg() {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://lck.hzlyzhenzhi.com/content/api/upload-image', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'upload',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            const data = JSON.parse(res.data)
            that.data.contentData.image.push(data.data.imageUrl)
            that.setData({
              ['contentData.image']: that.data.contentData.image
            })
            //do something
          },
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success(resp) {
            that.data.images.push(resp.path)
            that.setData({
              images: that.data.images
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData && app.globalData.userInfo && app.globalData.userInfo.id) {
      this.data.contentData.uid = app.globalData.userInfo.id
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.navigateBack()
    }
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