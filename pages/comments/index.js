// pages/comments/inedx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
    count: [{ type: 0, number: 0 }, { type: 1, number: 0 }, { type: 2, number: 0 }, { type: 3, number: 0 }],
    productId: '',
    page: 1,
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.productId = options.id
    this.getComment(this.data.type, this.data.page)
  },
  getCommontData(e) {
    this.data.type = e.currentTarget.dataset.index
    this.getComment(this.data.type, this.data.page)
  },
  getComment(type, page) {
    let that = this
    app.request({
      url: '/content/api/product-comment',
      data: {
        productId: that.data.productId,
        type: type,
        page: page
      }
    }).then(res => {
      console.log(res)
      if (res.code === 1) {
        that.setData({
          count: res.data.count,
          commentList:res.data.comment
        })
      }
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
    this.setData({
      page: ++this.data.page
    })
    this.getComment(this.data.type, this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})