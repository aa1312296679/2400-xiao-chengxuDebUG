const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:null
  },
  onLoad: function () {
    this.setData({
      userInfo:app.globalData.userInfo
    })
    let that = this
    wx.login({
      success: function (res) {
        console.log('loginCode:', res.code)
        wx.request({
          url: `${app.globalData.host}/content/api/weixin-login`,
          method: 'post',
          data:{
            code: res.code
          },
          success(resp) {
            console.log(resp)
          }
        })
      }
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onshow(){
    console.log(app.globalData.userInfo)
  },
  onGotUserInfo(res){
    console.log(res)
    wx.setStorage({
      key: 'userInfo',
      data: res.detail.userInfo,
    })
    var userInfo = wx.getStorageSync('userInfo')
    app.globalData.userInfo = userInfo
    this.setData({
      userInfo: res.detail.userInfo
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  }
})
