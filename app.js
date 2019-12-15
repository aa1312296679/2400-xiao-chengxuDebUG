//app.js

//默认值为地图图标
var tempLocation ="";
//百度sdk
var bmap=require("./utils/bmap-wx.min.js");
//util
var util = require("./utils/util.js");
//promise
var promisify = require("./utils/promisify");
//watch
var watchHandle=require("./utils/watch.js");
//ak
var ak ="yBx1zIk4go2uPtKmWuiyqPnYfwOVRRp6";

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this

    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak:ak
    });

    //请求地理位置       
    BMap.regeocoding({
      fail:(data)=> {
        tempLocation = { infor: "", ico:"/img/home/dingwei.png"};
        this.globalData.location = tempLocation;
      },
      success:(data)=> {
        // 获取城市信息
        tempLocation = { infor: data.originalData.result.addressComponent.city, ico:"/img/home/oldcar_01_03.png"};
        this.globalData.location = tempLocation;
      }
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
  /**
   * 监听globalData
   * @param method数据发生改变后的回调函数
   * @param globalDataName 监听的globalData的属性名
   * ** */
  watch: watchHandle,
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