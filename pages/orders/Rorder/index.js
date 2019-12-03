// pages/orders/Wcomment/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.request({
      url: '/content/api/my-order',
      data: {
        uid: app.globalData.userInfo.id,
        type: 2
      }
    }).then(res => {
      console.log(res)
      that.setData({
        orderInfo: res.data.order
      })
    })
  },
  userShou(e) {
    let that = this
    app.request({
      url: '/content/api/member-sure-product',
      data: {
        uid: app.globalData.userInfo.id,
        orderId: e.currentTarget.dataset.id
      }
    }).then(res => {
      wx.showToast({
        title: '收货成功',
        type: 'success'
      })
      app.request({
        url: '/content/api/my-order',
        data: {
          uid: app.globalData.userInfo.id,
          type: 2
        }
      }).then(res => {
        that.setData({
          orderInfo: res.data.order
        })
      })
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
    let that = this
    this.setData({
      page: ++this.data.page
    })
    app.request({
      url: '/content/api/my-order',
      data: {
        uid: app.globalData.userInfo.id,
        type: 2,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        orderInfo: that.data.orderInfo.concat(res.data.order)
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})