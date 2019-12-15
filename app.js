//app.js

//默认值为地图图标
var tempLocation ="/img/home/dingwei.png";
//百度sdk
var bmap=require("./utils/bmap-wx.min.js");
//util
var util = require("./utils/util.js");
//ak
var ak ="yBx1zIk4go2uPtKmWuiyqPnYfwOVRRp6";

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this

    console.log(util.locationFail);
    console.log(util.locationSuccess);
    console.log("www0");

    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak:ak
    });

    BMap.regeocoding({
      fail: util.locationFail,
      success: util.locationSuccess.bind(this)
    });

    // 登录
    wx.login({
      success(res1) {
        // // 获取用户信息
        wx.getSetting({
          success: res => {
            console.log(res)
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  // this.globalData.userInfo = res.userInfo
                  const userInfo = res.userInfo
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
                    url: `${that.globalData.host}/content/api/weixin-login`,
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: jsonData,
                    success(resp) {
                      that.globalData.userInfo = resp.data.data
                      console.log(122)
                      console.log(that.globalData.userInfo)
                    }
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  // if (this.userInfoReadyCallback) {
                  //   this.userInfoReadyCallback(res)
                  // }
                }
              })
            }
          }
        })
      
      }
    })

    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  request({ url, data = {}, method = "post", header = { 'content-type': "application/x-www-form-urlencoded" }, host, complate }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: (host || this.globalData.host) + url,
        header, method, data,
        success(res) {
          resolve(res.data)
        },
        complete() {
          if (complate) complate();
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    host: 'https://lck.hzlyzhenzhi.com',
    location: tempLocation
  }
})