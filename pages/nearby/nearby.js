// pages/nearby.js
var QQMapWX = require('./../../utils/qqmap-wx-jssdk.js')
var qqmapsdk
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'XEZBZ-IYJCG-AN7QT-IPO44-KCTT3-GZF35'
    })
  },
  mapAddress(e) {
    console.log(e)
    const index = Number(e.currentTarget.dataset.index)
    const data = this.data.list[index]
    wx.openLocation({
      latitude: data.location.lat,
      longitude: data.location.lng,
      name: data.name
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
    let that = this
    wx.getLocation({
      type: 'gcj02 ',
      isHighAccuracy: false,
      success(res) {
        console.log(res)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success(res) {
            that.setData({
              address: res.result.address
            })
            app.request({
              url: '/content/api/nearby-shop',
              data: {
                page: 1,
                area: res.result.address_component.district
                //  res.result.address_component.province + res.result.address_component.city + 
              }
            }).then(res1 => {
              res1.data.map(item => {
                const address = item.province+item.city+item.area+item.address
                qqmapsdk.geocoder({
                  address: address,
                  success(res) {
                    item.location = res.result.location
                  }
                })
              })
              if (res1.code === 1) {
                that.setData({
                  list: res1.data
                })
                console.log(that.data.list)
              }
            })
          },
          complete(res) {
            console.log(res)
          }
        })
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