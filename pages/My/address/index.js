// pages/My/address/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    type: null,
    productId: null
  },
editAddress() {
  wx.chooseAddress({
    success(res) {
      console.log(res.userName)
      console.log(res.postalCode)
      console.log(res.provinceName)
      console.log(res.cityName)
      console.log(res.countyName)
      console.log(res.detailInfo)
      console.log(res.nationalCode)
      console.log(res.telNumber)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.type) {
      this.setData({
        type: options.type,
        productId: options.productId
      })
    }
    if (app.globalData.userInfo) {
      this.getAddress()
    } else {
      wx.reLaunch({
         url: '/pages/login/index',
       })
    }
  },
  getAddress() {
    app.request({
      url: '/content/api/user-address',
      data: {
        uid: app.globalData.userInfo.id
      }
    }).then(res => {
      this.setData({
        addressList: res.data
      })
    })
  },
  goToShop(e) {
    if (this.data.type === 'shop') {
      wx.navigateTo({
        url: '/pages/goodsinfo/index?addressId=' + e.currentTarget.dataset.id + '&id=' + this.data.productId,
      })
    }
  },
  delAddress(e) {
    console.log(e)
    app.request({
      url: '/content/api/address-delete',
      data: {
        uid: app.globalData.userInfo.id,
        addressId: e.currentTarget.dataset.id
      }
    }).then(res => {
      this.getAddress()
      wx.showToast({
        title: '删除成功',
        type: 'success'
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
    console.log(this.data.type)
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