// pages/orders/Wcomment/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: app.globalData.userInfo.id,
    isShow: false,
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.request({
      url:'/content/api/user-quality',
      data:{
        uid:app.globalData.userInfo.id
      }
    }).then(res=>{
      console.log(res.data)
      if (res.code == 1) {
        this.setData({
          listData: res.data.quality
        })
      }
    })
  },

  formSubmit(e){
    console.log(e)
    let data = e.detail.value
    app.request({
      url:'/content/api/quality-add',
      
    }).then(res=>{

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})