// pages/car/oldcar.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    index: null,
    Sdisplay: 'none',
    priceIndex: null,
    searchQuery: {
      priceMin: null,
      priceMax: null,
      search: null,
      type: 3,
      brand: null,
      voltageMin: null,
      voltageMax: null,
      mileageMin: null,
      mileageMax: null,
      sex: null
    }
  },
  changeBorad(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      index: index
    })
    let board = ''
    if (index == 0) {
      board = '大众'
    } else if (index == 1) {
      board = '奥迪'
    } else if (index == 2) {
      board = '宝马'
    } else if (index == 3) {
      board = '奔驰'
    }
    this.setData({
      ['searchQuery.brand']: board
    })
  },
  changePrice(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      priceIndex: index
    })
    let min = 0
    let max = 0
    if (index == 0) {
      min = 50000
      max = 100000
    } else if (index == 1) {
      min = 100000
      max = 200000
    } else if (index == 2) {
      min = 200000
      max = 300000
    }
    this.setData({
      ['searchQuery.priceMin']: min,
      ['searchQuery.priceMax']: max
    })
  },
  formReset(e) {
    this.setData({
      index: null,
      priceIndex: null,
      Sdisplay: 'none'
    })
    this.data.searchQuery = {
      priceMin: null,
      priceMax: null,
      search: null,
      type: 3,
      brand: null,
      voltageMin: null,
      voltageMax: null,
      mileageMin: null,
      mileageMax: null,
      sex: null
    }
  },
  formSubmit(e) {
    console.log(e)
    let that = this
    const data = e.detail.value
    if (!this.data.priceIndex) {
      this.setData({
        ['searchQuery.priceMin']: data.priceMin
      })
    }
    if (data.sex) {
      if (data.sex.indexOf('男') > -1) {
        this.setData({
          ['searchQuery.sex']: 1
        })
      } else if (data.sex.indexOf('女') > -1) {
        this.setData({
          ['searchQuery.sex']: 2
        })
      } else {
        this.setData({
          ['searchQuery.sex']: 0
        })
      }
    }
    this.setData({
      ['searchQuery.voltageMin']: data.voltageMin,
      ['searchQuery.mileageMin']: data.mileageMin
    })
    app.request({
      url: '/content/api/product-access',
      data: that.data.searchQuery
    }).then(res => {
      that.setData({
        carList: res.data.data,
        Sdisplay: 'none'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOldCar(options.type || 3)
  },
  getOldCar(type) {
    app.request({
      url: `/content/api/product-access`,
      method: 'post',
      data: {
        type: type,
      }
    }).then(resp => {
      console.log(resp)
      this.setData({
        carList: resp.data.product
      })
    })
  },
  searchData(e) {
    let that = this
    let search = e.detail.value
    that.setData({
      ['searchQuery.search']: search
    })
    app.request({
      url: '/content/api/product-access',
      data: {
        type: 1,
        search: search
      }
    }).then(res => {
      that.setData({
        chooseList: res.data.data
      })
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
  shaixuan: function(e) {
    this.setData({
      Sdisplay: "block"
    })
  },
  userSearch() {
    this.setData({
      Sdisplay: 'none'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})