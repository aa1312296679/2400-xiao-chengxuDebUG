// pages/My/address/waddress/index.js
var QQMapWX = require('./../../../../utils/qqmap-wx-jssdk.js')
var qqmapsdk
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId: null,
    type: null,
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
      label: '家'
    },
    labelIndex: 0,
  },
  selectLabel(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      labelIndex: index
    })
    let text = ''
    if (index == 0) {
      text = '家'
    } else if (index == 1) {
      text = '公司'
    } else if (index == 2) {
      text = '学校'
    }
    this.setData({
      ['addressData.label']: text
    })
  },
  getUserAddress() {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success(res) {
            that.setData({
              ['addressData.area']: res.result.address
            })
          },
          complete(res) {
            console.log(res)
          }
        })
      }
    })
  },
  getAddressData(id) {
    const that = this
    app.request({
      url: '/content/api/user-address',
      data: {
        uid: app.globalData.userInfo.id
      }
    }).then(res => {
      res.data.map(item => {
        if (item.id == id) {
          that.setData({
            ['addressData.name']: item.name,
            ['addressData.phone']: item.phone,
            ['addressData.address']: item.address,
            ['addressData.default']: item.default,
            ['addressData.area']: item.area
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.type) {
      this.setData({
        type: options.type,
        productId: options.productId
      })
    }
    qqmapsdk = new QQMapWX({
      key: 'XEZBZ-IYJCG-AN7QT-IPO44-KCTT3-GZF35'
    })
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
      this.getAddressData(options.id)
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
  addAddress() {
    delete this.data.addressData.addressId
    console.log(this.data.addressData)
    app.request({
      url: '/content/api/add-address',
      data: this.data.addressData
    }).then(res => {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      if (this.data.type === 'shop') {
        wx.redirectTo({
          url: '/pages/My/address/index?type=' + this.data.type + '&productId=' + this.data.productId,
        })
      } else {
        wx.redirectTo({
          url: '/pages/My/address/index',
        })
      }
    })
  },
  updateAddress() {
    app.request({
      url: '/content/api/add-address',
      data: this.data.addressData
    }).then(res => {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      if (this.data.type === 'shop') {
        wx.redirectTo({
          url: '/pages/My/address/index?type=' + this.data.type + '&productId=' + this.data.productId,
        })
      } else {
        wx.redirectTo({
          url: '/pages/My/address/index',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})