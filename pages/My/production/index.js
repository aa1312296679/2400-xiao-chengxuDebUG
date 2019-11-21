// pages/orders/Wcomment/index.js
const app = getApp();
const utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: app.globalData.userInfo.id,
    isShow: false,
    listData: [],
    productData: null,
    addData: {
      uid: null,
      productId: null,
      gyTime: null,
      barCode: null
    }
  },
  closeAdd() {
    this.setData({
      isShow: false
    })
  },
  addInfo(e) {
    console.log(e)
    let data = this.data.listData[e.currentTarget.dataset.index]
    data.buyTime = utils.formatTime(new Date(data.buyTime * 1000))
    this.setData({
      productData: data
    })
    this.setData({
      isShow: true
    })
  },
  afterSale(e) {
    app.request({
      url: '/content/api/product-after',
      data: {
        uid: app.globalData.userInfo.id,
        qualityId: e.currentTarget.dataset.id
      }
    }).then(res => {
      wx.showToast({
        title: '已申请',
        type: 'success'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.request({
      url:'/content/api/user-quality',
      data:{
        uid:app.globalData.userInfo.id
      }
    }).then(res=>{
      console.log(res.data)
      if (res.code == 1) {
        this.setData({
          listData: res.data.quality
        })
      }
    })
  },
  formSubmit(e){
    console.log(e)
    let data = e.detail.value
    app.request({
      url:'/content/api/quality-add',
      data: {
        uid: app.globalData.userInfo.id,
        orderNumber: this.data.productData.orderNumber,
        gyTime: data.gyTime,
        barCode: data.barCode
      }
    }).then(res=>{
      wx.showToast({
        title: '已提交',
        type: 'success'
      })
      this.setData({
        isShow: false
      })
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
  onShareAppMessage: function () {

  }
})