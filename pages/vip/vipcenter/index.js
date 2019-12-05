// pages/vip/vipcenter/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    ismask: false,
    name: '',
    userInfo:null
  },
  userVip(e) {
    console.log(e)
    const month = Number(e.currentTarget.dataset.num)
    const money = Number(e.currentTarget.dataset.money)
    app.request({
      url: '/content/api/member-apply-add',
      data: {
        uid: app.globalData.userInfo.id,
        month: month,
        money: money
      }
    }).then(res => {
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
              title: '开通成功',
              type: 'success'
            })
          },
          complete: (data) => {
            console.log(data)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (app.globalData && app.globalData.userInfo && app.globalData.userInfo.id) {
      this.setData({
        name: app.globalData.userInfo.nickname
      })
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                console.log(res)
                res.userInfo.phone = app.globalData.userInfo.phone
                that.setData({
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })
      app.request({
        url: '/content/api/member-recharge',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log(res)
      })
      app.request({
        url: '/content/api/member-apply',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log(res)
      })
      app.request({
        url: '/content/api/user-personal',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log('个人中心')
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
  goBuy() {
    this.setData({
      isShow: true,
      ismask: true,
    })
  },
  closePlate() {
    this.setData({
      isShow: false,
      ismask: false,
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