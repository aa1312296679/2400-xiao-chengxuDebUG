// pages/My/assemble /index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData && app.globalData.userInfo && app.globalData.userInfo.id) {
      app.request({
        url: '/content/api/group-index'
      }).then(res => {
        console.log(res)
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.switchTab({
        url: '/pages/user/user',
      })
    }

    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '快来.....啦',
      // imageUrl: 'http://xxxx',//图片地址
      path: '/pages/index/index?jump=123',// 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }

  }
})
