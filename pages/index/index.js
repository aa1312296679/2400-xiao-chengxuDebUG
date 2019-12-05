//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    content:'',
    goodProduct:[],
    bnrUrl: [
      // { "url": "../../img/home/木马首页_04.png" }, 
      // { "url": "../../img/home/木马首页_04.png" }, 
      // { "url": "../../img/home/木马首页_04.png" }, 
      // { "url": "../../img/home/木马首页_04.png" }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToUrl(e) {
    console.log(e)
    if (e.currentTarget.dataset.imageurl) {
      wx.navigateTo({
        url: e.currentTarget.dataset.imageurl,
      })
    }
  },
  onLoad: function (options) {
    if (options.code) {
      wx.setStorage({
        key: 'code',
        data: options.code,
      })
    }
    var that = this
    wx.request({
      url: `${app.globalData.host}/content/api/home-index`,
      method:'post',
      data:{
        page: 1
      },
      success(res){
        that.setData({
          bnrUrl:res.data.data.advert,
          content: res.data.data.logo.content,
          goodProduct: res.data.data.goodProduct
        })
        console.log(res)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  search(e){
    let search = e.detail.value
    let that = this
    wx.request({
      url: `${app.globalData.host}/content/api/index-search`,
      method:'post',
      data:{
        search: search
      },
      success(res){
        console.log(res)
        if (res.data.code === 1) {
          that.setData({
            goodProduct: res.data.data
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
