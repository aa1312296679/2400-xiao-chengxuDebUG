// pages/orders/order/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    isShow: false,
    page: 1
  },
  showEvaluate(e) {
    this.setData({
      orderId: e.currentTarget.dataset.id,
      isShow: true
    })
  },
  userEvaluate(e) {
    console.log(e)
    let that = this
    app.request({
      url: '/content/api/order-comment',
      data: {
        uid: app.globalData.userInfo.id,
        orderId: that.data.orderId,
        comment: e.detail.value.evaluate
      }
    }).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '评价成功',
          type: 'success'
        })
        that.setData({
          isShow: false,
          orderId: null
        })
        that.getOrder()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getOrder() {
    let that = this
    app.request({
      url: '/content/api/my-order',
      data: {
        uid: app.globalData.userInfo.id,
        type: 99
      }
    }).then(res => {
      console.log(res)
      that.setData({
        orderList: res.data.order
      })
    })
  },
  userPay(e) {
    let that = this
    app.request({
      url: '/content/api/pay-order',
      data: {
        uid: app.globalData.userInfo.id,
        orderId: e.currentTarget.dataset.id
      }
    }).then(res => {
      console.log(res)
      if (res.code == 1) {
        let timeStamp = Date.parse(new Date())
        timeStamp = timeStamp.toString()
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
            that.getOrder()
          },
          complete: (data) => {
            console.log(data)
          }
        })
      }
    })
  },
  userShou(e) {
    let that = this
    app.request({
      url: '/content/api/user-sure',
      data: {
        uid: app.globalData.userInfo.id,
        orderId: e.currentTarget.dataset.id
      }
    }).then(res =>{
      wx.showToast({
        title: '收货成功',
        type: 'success'
      })
      that.getOrder()
    })
  },
  userCui() {
    wx.showToast({
      title: '已催单',
      type: 'success'
    })
  },
  onLoad: function (options) {
    if (app.globalData.userInfo.id) {
        this.getOrder()
    } else {
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
    let that = this
    this.setData({
      page: ++this.data.page
    })
    app.request({
      url: '/content/api/my-order',
      data: {
        uid: app.globalData.userInfo.id,
        type: 99,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        orderList: that.data.orderList.concat(res.data.order)
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})