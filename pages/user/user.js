const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    guessInfo:[]
  },
  onshow() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    let that = this
  },
  onLoad: function() {
    let that = this
    app.request({
      url: '/content/api/guess-you',
      data:{
        uid: app.globalData.userInfo.id
      }
    }).then(res=>{
      console.log(res)
      that.setData({
        guessInfo:res.data
      })
    })



    this.setData({
      userInfo: app.globalData.userInfo
    })
    // wx.login({
    //   success: function(res1) {
    //     wx.getUserInfo({
    //       success: function(res) {
    //         console.log(res)
    //         var userInfo = res.userInfo
    //         let jsonData = {
    //           code: res1.code,
    //           avatar: userInfo.avatarUrl,
    //           province: userInfo.province,
    //           city: userInfo.city,
    //           nickname: userInfo.nickName,
    //           area: userInfo.country,
    //           gender: userInfo.gender
    //         }
    //         wx.request({
    //           url: `${app.globalData.host}/content/api/weixin-login`,
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           method: 'post',
    //           data: jsonData,
    //           success(resp) {
    //             console.log(resp)
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success(res) {
    //           that.setData({
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },
  onshow() {
    console.log(app.globalData.userInfo)
  },
  userlogin() {
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },
  onGotUserInfo(res) {
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
    wx.login({
      success(res1) {
        let jsonData = {
          code: res1.code,
          avatar: userInfo.avatarUrl,
          province: userInfo.province,
          city: userInfo.city,
          nickname: userInfo.nickName,
          area: userInfo.country,
          gender: userInfo.gender
        }
        console.log(jsonData)
        wx.request({
          url: `${app.globalData.host}/content/api/weixin-login`,
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: jsonData,
          success(resp) {
            console.log(resp)
          }
        })
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  }
})