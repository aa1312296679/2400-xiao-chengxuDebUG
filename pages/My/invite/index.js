// pages/My/invite/index.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    dia:false,
    code:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.request({
      url:'/content/api/my-share',
      data:{
        uid:app.globalData.userInfo.id
      }
    }).then(res=>{
      console.log(res)
    })
  },
  showDia(){
    this.setData({
      dia: true
    })
  },

  submitCode(e){
    this.setData({
      dia:false
    })
    console.log(e)
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