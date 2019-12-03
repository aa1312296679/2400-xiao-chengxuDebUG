// pages/orders/Wcomment/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:[],
    totalMoney: 0,
    page: 1
  },
  cancalOrder(e) {
    app.request({
      url: '/content/api/member-delete-order',
      data: {
        uid: app.globalData.userInfo.id,
        orderId: e.currentTarget.dataset.id
      }
    }).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '取消成功',
          type: 'success'
        })
        let that = this
        app.request({
          url: '/content/api/my-order',
          data: {
            uid: app.globalData.userInfo.id,
            type: 0
          }
        }).then(res => {
          that.setData({
            orderInfo: res.data.order
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.request({
      url:'/content/api/my-order',
      data:{
        uid: app.globalData.userInfo.id,
        type :0
      }
    }).then(res => {
      that.setData({
        orderInfo: res.data.order
      })
      let totalMoney = 0
      that.data.orderInfo.map(r => {
        totalMoney += Number(r.payPrice)
      })
      that.setData({
        totalMoney: totalMoney
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  userPay(e) {
      app.request({
        url: '/content/api/pay-order',
        data: {
          uid: app.globalData.userInfo.id,
          orderId: e.currentTarget.dataset.id
        }
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          let timeStamp = Date.parse(new Date())
          timeStamp = timeStamp.toString()
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
        }
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
    let that = this
    this.setData({
      page: ++this.data.page
    })
    app.request({
      url: '/content/api/my-order',
      data: {
        uid: app.globalData.userInfo.id,
        type: 0,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        orderInfo: that.data.orderInfo.concat(res.data.order)
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})