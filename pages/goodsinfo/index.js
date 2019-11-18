// pages/goodsinfo/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    isShow: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    "bnrUrl": [
      { "url": "../../img/home/商品详情_02.jpg" },
      { "url": "../../img/home/商品详情_02.jpg" },
      { "url": "../../img/home/商品详情_02.jpg" },
      { "url": "../../img/home/商品详情_02.jpg" }
    ],
    productData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (app.globalData.userInfo && app.globalData.userInfo.id) {
      app.request({
        url: '/content/api/product-detail',
        data: {
          productId: options.id,
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log(res)
        this.setData({
          productData: res.data.product
        })
      })
    }else {
      app.request({
        url: '/content/api/product-detail',
        data: {
          productId: options.id
        }
      }).then(res => {
        console.log(res)
        this.setData({
          productData: res.data.product
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goBuy() {
    this.setData({
      isShow: true
    })
  },
  closeBuy() {
    this.setData({
      isShow: false
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