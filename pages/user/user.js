const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    guessInfo:[],
    uid:null
  },

  onLoad: function() {
    console.log(app.globalData.userInfo)
    let that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log('信息')
    console.log(app.globalData.userInfo)
    if (this.data.userInfo && this.data.userInfo.id){
      app.request({
        url: '/content/api/guess-you',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        that.setData({
          guessInfo: res.data
        })
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
    }
    console.log(this.data.userInfo)
  },
  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  userlogin() {
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },
  onGotUserInfo(res) {
    let userInfo = res.detail.userInfo
    let that = this
    wx.setStorage({
      key: 'userInfo',
      data: res.detail.userInfo,
    })
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
        wx.request({
          url: `${app.globalData.host}/content/api/weixin-login`,
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: jsonData,
          success(resp) {
            app.globalData.userInfo = resp.data.data
            app.request({
              url: '/content/api/guess-you',
              data: {
                uid: app.globalData.userInfo.id
              }
            }).then(res => {
              that.setData({
                guessInfo: res.data
              })
            })
          }
        })
      }
    })
  },
  viewDetails(e) {
    wx.redirectTo({
      url: '/pages/goodsinfo/index?id=' + e.currentTarget.dataset.id,
    })
  },
  userVip() {
    app.request({
      url: '/content/api/member-apply-add',
      data: {
        uid: app.globalData.userInfo.id,
        month: 12,
        money: 100
      }
    }).then(res =>{
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
          },
          complete: (data) => {
            console.log(data)
          }
        })
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  }
})