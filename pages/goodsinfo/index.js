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
    console.log(options)
    if (app.globalData.userInfo && app.globalData.userInfo.id) {
      this.setData({
        productId: options.id
      })
      app.request({
        url: '/content/api/product-detail',
        data: {
          productId: options.id,
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        console.log(res)
        if (res.data.comment && res.data.comment.comment.length) {
          this.setData({
            comment: res.data.comment.comment
          })
        }
        this.setData({
          productData: res.data.product,
          show: true
        })
        if (options.addressId) {
          const that = this
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
          this.setData({
            addressId: options.addressId
          })
        } else if (res.data.userAddress) {
          this.setData({
            addressId: res.data.userAddress.id,
            userInfo: res.data
          })
        }
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
          productData: res.data.product,
          show: true
        })
        if (res.data.comment && res.data.comment.comment.length) {
          this.setData({
            comment: res.data.comment.comment
          })
        }
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
    if (this.data.type) {
      app.request({
        url: '/content/api/cart-add',
        data: {
          uid: app.globalData.userInfo.id,
          productId: this.data.productId,
          number: this.data.num
        }
      }).then(res => {
        wx.showToast({
          title: '已加入购物车',
          type:'success'
        })
      })
    } else { 
       app.request({
         url: '/content/api/create-order',
         data: {
           uid: app.globalData.userInfo.id,
           productId: that.data.productId,
           number: that.data.num,
           integral: 0,
           couponId: 0,
           type: 2,
           remark: that.data.remark,
           addressId: that.data.addressId
         }
       }).then(res => {
         console.log(res)
        //  if (that.data.productData.type != 1) {
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
        //   } else {
        //   wx.navigateTo({
        //     url: '/pages/pay/index?id=' + that.data.productId + '&orderId='+res.data.orderId,
        //   })
        // }
       })
    }
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