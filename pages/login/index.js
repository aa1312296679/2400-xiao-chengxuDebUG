// pages/login/login/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      phone: 12345678987,
      password: 123456
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login() {
    wx.request({
      url: `${app.globalData.host}/content/api/user-login`,
      method: 'post',
      data: this.data.userInfo,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(res)
        app.globalData.userInfo = res.data.data.user
        wx.switchTab({
          url: '/pages/user/user',
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})