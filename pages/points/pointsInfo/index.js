// pages/points/pointsInfo/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (app.globalData && app.globalData.userInfo && app.globalData.userInfo.id) {
        app.request({
          url: '/content/api/coupon-message',
          data: {
            uid: app.globalData.userInfo.id
          }
        }).then(res => {
          if (res.code === 1) {
            if (res.data.coupons&&res.data.coupons.length) {
              res.data.coupons.map(item => {
                if (item.integral && Number(item.integral) > 0) {
                  that.data.couponList.push(item)
                }
              })
              that.setData({
                couponList: that.data.couponList
              })
            }
          }
          console.log(res)
        })
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
  userGetCoupon(e) {
    const id = e.currentTarget.dataset.id
    app.request({
      url: '/content/api/integral-coupon',
      data: {
        uid: app.globalData.userInfo.id,
        couponId: id
      }
    }).then(res => {
      if (res.code === 1) {
        wx.showToast({
          title: '领取成功',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
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