// pages/orders/Wcomment/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderList: [],
    isShow: false,
    orderId: null,
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
  getOrder() {
    let that = this
    app.request({
      url: '/content/api/my-order',
      data: {
        uid: app.globalData.userInfo.id,
        type: 3
      }
    }).then(res => {
      console.log(res)
      that.setData({
        orderList: res.data.order
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData && app.globalData.userInfo && app.globalData.userInfo.id) {
      this.getOrder()
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.switchTab({
        url: '/pages/user/user',
      })
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
        type: 3,
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