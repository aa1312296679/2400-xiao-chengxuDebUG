// pages/orders/writeorder/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    productId: '',
    productData: null,
    addressId: null,
    userInfo: null,
    num: 1,
    type: '',
    productList: [],
    total: 0
  },
  userSubmit(e) {
    console.log(this.data.addressId)
    if (!this.data.addressId) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
    } else {
      let that = this
      if (that.data.type == 1) {
        let products = ''
        that.data.productList.map((item, index) => {
          if (that.data.productList.length>1) {
            if (index < that.data.productList.length - 1) {
              products += "'" + item.productId + '-' + item.number + ","
            } else {
              products += item.productId + '-' + item.number + "'"
            }
          } else {
            products += "'" + item.productId + '-' + item.number + "'"
          }
        })
        app.request({
          url: '/content/api/create-order-by-cart',
          data: {
            uid: app.globalData.userInfo.id,
            products: '1-1',
            integral: 0,
            couponId: 0,
            type: 2,
            remark: e.detail.value.content ? e.detail.value.content:'',
            addressId: that.data.addressId
          }
        }).then(res => {
          console.log(res)
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
              setTimeout(_ => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              })
            },
            complete: (data) => {
              console.log(data)
            }
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
            remark: e.detail.value.content ? e.detail.value.content : '',
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
              setTimeout(_ => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              })
            },
            complete: (data) => {
              console.log(data)
            }
          })
        })
      }

    }
  },
  chooseAddress() {
    if (this.data.type == 1) {
      wx.setStorage({
        key: 'info',
        data: {
          arr: this.data.productList,
          totalMoney: this.data.total
        },
      })
      wx.navigateTo({
        url: '/pages/My/address/index?type=shop&productId=' + this.data.productId +'buy=1',
      })
    } else {
      wx.navigateTo({
        url: '/pages/My/address/index?type=shop&productId=' + this.data.productId,
      })
    }
  },
  addCount(e) {
    let that = this
    console.log(e)
    if (e.currentTarget.dataset.index || e.currentTarget.dataset.index == 0) {
      const index = Number(e.currentTarget.dataset.index)
      let temp = Number(this.data.productList[index].number)
      temp = ++temp
      this.setData({
        ['productList['+index +'].number']: temp
      })
      that.data.num = 0
      that.data.total = 0
      that.data.productList.map(item => {
        that.data.num += Number(item.number)
        that.data.total += Number(item.number) * Number(item.price)
      })
      that.setData({
        num: that.data.num,
        total: that.data.total
      })
    } else {
      let temp = Number(this.data.num)
      temp = ++temp
      this.setData({
        num: temp
      })
    }
   
  },
  delCount(e) {
    let that = this
    if (e.currentTarget.dataset.index) {
      const index = Number(e.currentTarget.dataset.index)
      let temp = Number(this.data.num)
      if (temp > 1) temp = --temp
      this.setData({
        ['productList[' + index + '].number']: temp
      })
      that.data.num = 0
      that.data.productList.map(item => {
        that.data.num += Number(item.number)
        that.data.total += Number(item.number) * Number(item.price)
      })
      that.setData({
        num: that.data.num,
        total: that.data.total
      })
    } else {
      let temp = Number(this.data.num)
      if (temp > 1) temp = --temp
      this.setData({
        num: temp
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('信息')
    console.log(options)
    let tempInfo = ''
    wx.getStorage({
      key: 'info',
      success: function(res) {
        tempInfo = res.data
        const info = tempInfo
        console.log(info)

        that.data.num = 0
        info.arr.map(item => {
          that.data.num += Number(item.number)
        })
        that.setData({
          type: 1, // 用于判断从哪里过来的
          total: info.totalMoney,
          productList: info.arr,
          num: that.data.num
        })
        app.request({
          url: '/content/api/product-detail',
          data: {
            productId: info.arr[0].id,
            uid: app.globalData.userInfo.id
          }
        }).then(res => {
          if (options.addressId) {
            app.request({
              url: '/content/api/user-address',
              data: {
                uid: app.globalData.userInfo.id
              }
            }).then(res1 => {
              console.log(2233)
              console.log(options.addressId)
              console.log(res1)
              res1.data.map(item => {
                if (item.id == options.addressId) {
                  res.data.userAddress = item
                  that.setData({
                    addressId: options.addressId,
                    userInfo: res.data,
                    show:true
                  })
                }
              })
            })
            that.setData({
              addressId: options.addressId
            })
          } else if (res.data.userAddress) {
            console.log(1122)
            console.log(res)
            that.setData({
              show: true,
              addressId: res.data.userAddress.id,
              userInfo: res.data
            })
          }
        })
      },
      fail(err) {
        console.log('失败')
        if (options.info) {
          const info = JSON.parse(options.info)
          console.log(info)

          that.data.num = 0
          info.arr.map(item => {
            that.data.num += Number(item.number)
          })
          that.setData({
            type: 1, // 用于判断从哪里过来的
            total: info.totalMoney,
            productList: info.arr,
            num: that.data.num
          })
          app.request({
            url: '/content/api/product-detail',
            data: {
              productId: info.arr[0].id,
              uid: app.globalData.userInfo.id
            }
          }).then(res => {
            if (options.addressId) {
              app.request({
                url: '/content/api/user-address',
                data: {
                  uid: app.globalData.userInfo.id
                }
              }).then(res1 => {
                console.log(res1)
                res1.data.map(item => {
                  if (item.id == options.addressId) {
                    res.data.userAddress = item
                    that.setData({
                      addressId: options.addressId,
                      userInfo: res.data,
                      show:true
                    })
                  }
                })
              })
              that.setData({
                addressId: options.addressId
              })
            } else if (res.data.userAddress) {
              console.log(1122)
              console.log(res)
              that.setData({
                show: true,
                addressId: res.data.userAddress.id,
                userInfo: res.data
              })
            }
          })
        } else {
          console.log(options)
          if (app.globalData.userInfo && app.globalData.userInfo.id) {
            that.setData({
              productId: options.id
            })
            app.request({
              url: '/content/api/product-detail',
              data: {
                productId: options.id,
                uid: app.globalData.userInfo.id
              }
            }).then(res => {
              console.log(111)
              console.log(res)
              that.setData({
                productData: res.data.product,
              })
              if (options.addressId) {
                app.request({
                  url: '/content/api/user-address',
                  data: {
                    uid: app.globalData.userInfo.id
                  }
                }).then(res1 => {
                  console.log('地址')
                  console.log(options.addressId)
                  res1.data.map(item => {
                    if (item.id == options.addressId) {
                      res.data.userAddress = item
                      that.setData({
                        addressId: options.addressId,
                        userInfo: res.data,
                        show:true
                      })
                    }
                  })
                })
                that.setData({
                  addressId: options.addressId
                })
                console.log(that.data.addressId)
              } else if (res.data.userAddress) {
                that.setData({
                  addressId: res.data.userAddress.id,
                  userInfo: res.data,
                  show:true
                })
              }
            })
          } else {
            app.request({
              url: '/content/api/product-detail',
              data: {
                productId: options.id
              }
            }).then(res => {
              console.log(res)
              that.setData({
                productData: res.data.product
              })
            })
          }
        }
      }
    })
    console.log(that.data.addressId)
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