// pages/My/set/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: null,
    userData: {
      uid: null,
      avatar: null,
      phone: null,
      username: null,
      sex: null,
      birthday: null,
      work: null,
      province: null,
      city: null,
      area: null,
      identity: null
    }
  },

  /**
   * 生命周期函数--监听页面加载s
   */
  onLoad: function (options) {
    this.setData({
      uid: app.globalData.userInfo.id
    })
    console.log(this.data.uid)
    this.getUserInfo()
  },
  getUserInfo() {
    app.request({
      url: '/content/api/user-personal',
      data: {
        uid: this.data.uid
      }
    }).then(resp => {
      console.log(resp)
      const data = resp.data
      this.data.userData.uid = data.id
      this.data.userData.avatar = data.avatar
      this.data.userData.username = data.username
      this.data.userData.sex = data.sex
      this.data.userData.birthday = data.birthday
      this.data.userData.work = data.work
      this.data.userData.province = data.province
      this.data.userData.city = data.city
      this.data.userData.area = data.area
      this.data.userData.identity = data.identity
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