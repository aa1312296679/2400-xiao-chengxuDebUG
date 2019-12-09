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
      nickname:null,
      phone: null,
      name: null,
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
    if (app.globalData && app.globalData.userInfo && app.globalData.userInfo.id) {
      this.setData({
        uid: app.globalData.userInfo.id
      })
      this.getUserInfo()
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.switchTab({
        url: '/pages/user/user',
      })
    }
  },
  // 提交
  formSubmit(e){
    let subData = e.detail.value
    subData.sex = subData.sex == "男" ? 0 : 1
    subData.avatar = this.data.userData.avatar
    subData.uid = this.data.uid
    app.request({
      url:'/content/api/alter-msg',
      data: subData
    }).then(res=>{
      wx.showToast({
        title: '保存成功',
        type: 'success'
      })
    })
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
      this.setData({
        userData: data
      })

      // this.data.userData.uid = data.id
      // this.data.userData.avatar = data.nickname
      // this.data.userData.name = data.name
      // this.data.userData.sex = data.sex
      // this.data.userData.birthday = data.birthday
      // this.data.userData.work = data.work
      // this.data.userData.province = data.province
      // this.data.userData.city = data.city
      // this.data.userData.area = data.area
      // this.data.userData.identity = data.identity
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