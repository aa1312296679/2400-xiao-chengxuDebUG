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
    list: [],
    show: false
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
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    wx.getLocation({
      type: 'gcj02 ',
      isHighAccuracy: false,
      success(res) {
        console.log(res)
        let loc = {
          lat: res.latitude,
          lng: res.longitude
        }
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
                // province: res.result.address_component.province,
                // city: res.result.address_component.city,
                // // area: res.result.address_component.district
                // area: res.result.address_component.district
                province: '四川省',
                city: '成都市',
                area: '武侯区'
              }
            }).then(res1 => {
              if (res1.code === 1) {
                res1.data.map((item, index) => {
                  const address = item.province + item.city + item.area + item.address
                  qqmapsdk.geocoder({
                    address: address,
                    success(res) {
                      item.location = res.result.location
                      if (item.location) {
                        qqmapsdk.calculateDistance({
                          from: '',
                          to: item.location.lat + ',' + item.location.lng,
                          success: (res2) => {
                            item.distance = res2.result.elements[0].distance / 1000
                            that.setData({
                              list: res1.data
                            })
                            if (index === res1.data.length - 1) {
                              wx.hideLoading()
                              that.setData({
                                show: true
                              })
                            }
                          },
                          complete() {
                           
                          }
                        })
                      }
                    },
                    complete() {
                      wx.hideLoading()
                    }
                  })
                })
              } else {
                wx.hideLoading()
              }
            })
          },
          complete(res) {
            console.log(res)
            wx.hideLoading()
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