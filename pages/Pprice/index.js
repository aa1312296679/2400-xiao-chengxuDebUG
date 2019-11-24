// pages/Pprice/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseList: [],
    typeOptions: [],
    typeId: null
  },
  searchData(e) {
    let that = this
    let search = e.detail.value
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
  getTypeList() {
    app.request({
      url: '/content/api/product-all-cate'
    }).then(res => {
      this.setData({
        typeOptions: res.data,
        typeId: res.data[0].id
      })
      this.getProductListById(res.data[0].id)
    })
  },
  getProductList(e) {
    this.setData({
      typeId: e.currentTarget.dataset.id
    })
    this.getProductListById(e.currentTarget.dataset.id)
  },
  getProductListById(id) {
    let that = this
    app.request({
      url: '/content/api/cate-product',
      data: {
        catPid: id,
        page: 1
      }
    }).then(res => {
      that.setData({
        chooseList: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    this.getTypeList()
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