// pages/evaluate/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: '',
      img: '',
      title: '',
      valueData: {
        uid: '',
        orderId: '',
        comment: '',
        image: [],
        video: []
      },
    images: [],
      videos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      img: options.productImage,
      title: options.productTitle
    })
  },
  formSubmit(e) {
    this.data.valueData.orderId = this.data.id
    this.data.valueData.uid = app.globalData.userInfo.id
    this.data.valueData.comment = e.detail.value.comment
  
    app.request({
      url: '/content/api/order-comment',
      data: this.data.valueData
    }).then(res => {
      console.log(res)
      if (res.code === 1) {
        wx.showToast({
          title: '评价成功'
        })
        setTimeout(_ => {
          wx.navigateBack()
        },2000)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  uploadImg() {
    let that = this
    console.log(222)
    wx.chooseImage({
      success(res) {
        console.log(res)
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
            that.data.valueData.image.push(data.data.imageUrl)
            that.setData({
              ['valueData.image']: that.data.valueData.image
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
  uploadVid() {
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        const tempFilePaths = res.tempFilePath
        wx.uploadFile({
          url: 'http://lck.hzlyzhenzhi.com/content/api/file-image', //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'upload',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            console.log(res)
            const data = JSON.parse(res.data)
            that.data.valueData.video.push(data.data.fileUrl)
            that.setData({
              ['valueData.video']: that.data.valueData.video,
              videos: that.data.valueData.video
            })
            //do something
          },
        })
      }
    })
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