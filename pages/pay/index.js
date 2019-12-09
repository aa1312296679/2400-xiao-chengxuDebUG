// pages/pay/index.js
var QQMapWX = require('./../../utils/qqmap-wx-jssdk.js')
var qqmapsdk
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    car:[],
    totalMoney:0,
    id: null,
    address: '',
    images: [],
    imgUrl: [],
    videos: [],
    videoUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = options.info
    info = JSON.parse(info)
    console.log(info)
    this.setData({
      car: info.arr,
      totalMoney: info.totalMoney,
      id: info.arr[0].id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getLocation() {
    let that = this
    wx.getLocation({
      type: 'gcj02 ',
      isHighAccuracy: false,
      success(res) {
        console.log(res)
        let loc = {
          lat: res.latitude,
          lng: res.longitude
        }
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success(res) {
            console.log(res)
            that.setData({
              address: res.result.address
            })
          },
          complete(res) {

          }
        })
      }
    })
  },
  submitData(e) {
    console.log(e)
    let that = this
    let data = e.detail.value
    if (this.data.address && data.phone) {
      let tem = "'address-" + data.address + ',phone-' + data.phone
      if (that.data.imgUrl.length && that.data.videoUrl.length) {
        tem += ',image-' + that.data.imgUrl[0]
        tem += ',video-' + that.data.videoUrl[0]+"'"
      } else if (that.data.imgUrl.length) {
        tem += ',image-' + that.data.imgUrl[0] + "'"
      } else if (that.data.videoUrl.length) {
        tem += ',video-' + that.data.videoUrl[0] + "'"
      } else {
        tem += +"'"
      }
      app.request({
        url: '/content/api/create-order',
        data: {
          uid: app.globalData.userInfo.id,
          productId: that.data.car[0].id,
          number: that.data.car[0].number,
          integral: 0,
          couponId: 0,
          type: 2,
          remark: data.reamrk,
          extInfo: tem
        }
      }).then(res => {
        wx.requestPayment({
          timeStamp: res.data.timeStamp.toString(),
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: (res) => {
            wx.showToast({
              title: '支付成功',
              type: 'success'
            })
            setTimeout(_ => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            })
          },
          complete: (data) => {
            console.log(data)
          }
        })
      })
    } else {
      wx.showToast({
        title: '请选择地址和电话',
        icon: 'none'
      })
    }
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
            that.data.imgUrl.push(data.data.imageUrl)
            that.setData({
              imgUrl: that.data.imgUrl
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
  uploadVideo() {
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
            that.data.videoUrl.push(data.data.fileUrl)
            that.setData({
              videoUrl: that.data.videoUrl,
              videos: that.data.videoUrl
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
    let that = this
    qqmapsdk = new QQMapWX({
      key: 'XEZBZ-IYJCG-AN7QT-IPO44-KCTT3-GZF35'
    })
    this.getLocation()
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