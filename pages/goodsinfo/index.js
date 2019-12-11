// pages/goodsinfo/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
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
    productData: null,
    userInfo: null,
    type: null,
    num: 1,
    productId: null,
    addressId: null,
    remark: null,
    comment: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    if (app.globalData.userInfo && app.globalData.userInfo.id) {
      this.setData({
        productId: options.id
      })
      app.request({
        url: '/content/api/product-comment',
        data: {
          productId: options.id,
          type: 0,
          page: 1
        }
      }).then(res => {
        if (res.code === 1) {
          that.setData({
            comment: res.data.comment
          })
        }
      })
      app.request({
        url: '/content/api/product-detail',
        data: {
          productId: options.id,
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          if (typeof res.data.product.image == 'string') {
            res.data.product.image = res.data.product.image.split(',')
          }
        }
        that.setData({
          productData: res.data.product,
          show: true
        })
        if (options.addressId) {
          app.request({
            url: '/content/api/user-address',
            data: {
              uid: app.globalData.userInfo.id
            }
          }).then(res1 => {
            res1.data.map(item => {
              if (item.id == options.addressId) {
                res.data.userAddress = item
                that.setData({ 
                  addressId: options.addressId,
                  userInfo: res.data
                })
              }
            })
          })
          that.setData({
            addressId: options.addressId
          })
        } else if (res.data.userAddress) {
          that.setData({
            addressId: res.data.userAddress.id,
            userInfo: res.data
          })
        }
      })
    }else {
      app.request({
        url: '/content/api/product-comment',
        data: {
          productId: options.id,
          type: 0,
          page: 1
        }
      }).then(res => {
        if (res.code === 1) {
          that.setData({
            comment: res.data.comment
          })
        }
      })
      app.request({
        url: '/content/api/product-detail',
        data: {
          productId: options.id
        }
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          if (typeof res.data.product.image == 'string') {
            res.data.product.image = res.data.product.image.split(',')
          }
        }
        this.setData({
          productData: res.data.product,
          show: true
        })
      })
    }
  },
  addCount() {
    let temp = Number(this.data.num)
    temp = ++temp
    this.setData({
      num: temp
    })
  },
  delCount() {
    let temp = Number(this.data.num)
    if (temp > 1) temp = --temp
    this.setData({
      num: temp
    })
  },
  goCart() {
    this.setData({
      type: 'cart',
      isShow: true
    })
  },
  chooseAddress() {
    wx.navigateTo({
      url: '/pages/My/address/index?type=shop&productId='+this.data.productId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goBuy() {
    this.setData({
      isShow: true,
      type: null
    })
  },
  closePlate() {
    this.setData({
      isShow: false
    })
  },
  closeBuy() {
    let that = this
    if (app.globalData.userInfo && app.globalData.userInfo.id) {
      if (that.data.type) {
        app.request({
          url: '/content/api/cart-add',
          data: {
            uid: app.globalData.userInfo.id,
            productId: that.data.productId,
            number: that.data.num
          }
        }).then(res => {
          wx.showToast({
            title: '已加入购物车',
            type: 'success'
          })
        })
      } else {
        if (that.data.productData.type != 1) {
        wx.navigateTo({
          url: '/pages/orders/writeorder/index?id=' + that.data.productId,
        })
        } else {
          let temp = JSON.parse(JSON.stringify(that.data.productData))
          temp.number = that.data.num
          let info = {
            arr: [temp],
            totalMoney: that.data.productData.price*that.data.num
          }
          wx.navigateTo({
            url: '/pages/pay/index?info=' + JSON.stringify(info),
          })
        }
      }
      this.setData({
        isShow: false
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(_ => {
        wx.switchTab({
          url: '/pages/user/user',
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.removeStorage({
      key: 'info',
      success(res) {
        console.log(res)
      }
    })
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