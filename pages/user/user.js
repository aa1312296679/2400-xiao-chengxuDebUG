const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    guessInfo:[],
    uid:null,
    orderNumber: [],
    integral: 0,
    couponNumber: 0,
    memberData: null
  },

  onLoad: function() {
    console.log(app.globalData.userInfo)
    let that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
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
    let that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if (this.data.userInfo&&this.data.userInfo.id) {
      app.request({
        url: '/content/api/user-personal',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          that.setData({
            couponNumber: res.data.couponNumber,
            integral: res.data.integral,
            ['userInfo.nickName']: res.data.nickname
          })
        }
      })
      app.request({
        url: '/content/api/my-order-number',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        if (res.code === 1) {
          console.log(res)
          that.setData({
            orderNumber: res.data
          })
        }
      })
      let that = this
      if (this.data.userInfo && this.data.userInfo.id) {
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
                  that.getVipInfo()
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
    }
  },
  userlogin() {
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },
  getVipInfo() {
    let that = this
    app.request({
      url: '/content/api/member-apply',
      data: {
        uid: app.globalData.userInfo.id
      }
    }).then(res => {
      console.log('会员')
      console.log(res)
      if (res.code === 1) {
        that.setData({
          memberData: res.data
        })
      }
    })
  },
  onGotUserInfo(res) {
    console.log(res)
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
            that.getVipInfo()
            app.globalData.userInfo = resp.data.data
            const code = wx.getStorage({
              key: 'code',
              success: function(userd) {
                app.request({
                  url: '/content/api/share-success',
                  data: {
                    uid: resp.data.data.id,
                    pid: userd
                  }
                }).then(res =>{
                  wx.removeStorage({
                    key: 'code',
                    success(res) {
                      console.log(res)
                    }
                  })
                })
              },
            })
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
            app.request({
              url: '/content/api/my-order-number',
              data: {
                uid: app.globalData.userInfo.id
              }
            }).then(res => {
              if (res.code === 1) {
                console.log(res)
                that.setData({
                  orderNumber: res.data
                })
              }
            })
            app.request({
              url: '/content/api/user-personal',
              data: {
                uid: app.globalData.userInfo.id
              }
            }).then(res => {
              if (res.code === 1) {
                that.setData({
                  couponNumber: res.data.couponNumber,
                  integral: res.data.integral
                })
              }
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