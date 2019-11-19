// pages/My/address/waddress/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {
      uid: null,
      addressId: null,
      province: null,
      city: null,
      area: null,
      address: null,
      name: null,
      phone: null,
      default: 0,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (app.globalData.userInfo) {
      this.setData({
        ['addressData.uid']: app.globalData.userInfo.id
      })
    } else {
      wx.reLaunch({
        url: '/pages/login/index'
      })
    }
    if (options.id) {
      this.setData({
        ['addressData.addressId']: options.id
      })
    }
  },
  setpeople(e) {
    let that = this;
    that.setData({
      ['addressData.name']: e.detail.value,
    })
  },
  setphone(e) {
    let that = this;
    that.setData({
      ['addressData.phone']: e.detail.value,
    })
  },
  setarea(e) {
    let that = this;
    that.setData({
      ['addressData.area']: e.detail.value,
    })
  },
  setaddress(e) {
    let that = this;
    that.setData({
      ['addressData.address']: e.detail.value,
    })
  },
  checkboxChange(e) {
    let that = this;
    if (e.detail.value && e.detail.value[0]) {
      that.setData({
        ['addressData.default']: e.detail.value[0],
      })
    } else {
      that.setData({
        ['addressData.default']: 0,
      })
    }
  },
  saveInfo() {
    if (this.data.addressData.addressId) {
      this.updateAddress()
    } else {
      this.addAddress()
    }
  },
  addAddress(){
    delete this.data.addressData.addressId
    console.log(this.data.addressData)
    app.request({
      url: '/content/api/add-address',
      data: this.data.addressData
    }).then(res => {
      console.log(res)
    })
  },
  updateAddress() {
    app.request({
      url: '/content/api/add-address',
      data: this.data.addressData
    }).then(res => {
      console.log(res)
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