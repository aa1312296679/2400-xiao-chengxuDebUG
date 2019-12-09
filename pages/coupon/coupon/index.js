// pages/coupon/coupon/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    couponList1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData && app.globalData.userInfo && app.globalData.userInfo.id) {
      let that = this
      app.request({
        url: '/content/api/member-coupon',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log(res)
        let temp = []
        let temp1 = []
        if (res.data.coupons && res.data.coupons.length) {
          res.data.coupons.map(item => {
            if (item.integral && Number(item.integral) > 0) {
              temp.push(item) // 积分
            } else {
              temp1.push(item)
            }
          })
        }
        that.setData({
          couponList: temp,
          couponList1: temp1
        })
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