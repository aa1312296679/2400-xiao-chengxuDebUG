// pages/car.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    allMoney: 0,
    check: false,
    ids: {},
    subInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.request({
      url:'/content/api/user-cart',
      data:{
        uid: app.globalData.userInfo.id
      }
    }).then(res=>{
      that.setData({
        info:res.data
      })
    })
  },
  // 计算总价
  getAllMoney(){
    // let arr = this.data.info.filter(v => Object.keys(this.data.ids).some(r => r === v.id))
    let allMoney = 0;
    this.data.info.map(v => {
      if (Object.keys(this.data.ids).some(r => r === v.id)) {
        allMoney += Number(v.price) * v.number
      }
    })
    this.setData({
      allMoney
    })
    console.log(allMoney)
  },
  delCount(e){
    let that = this
    let index = e.currentTarget.dataset.index
    if (that.data.info[index].number>1){
      that.data.info[index].number --
      that.setData({
        info: that.data.info
      })
      this.getAllMoney()
    }
   
  },

  addCount(e){
    let that = this
    let index = e.currentTarget.dataset.index
    that.data.info[index].number ++
    that.setData({
      info: that.data.info,
      ids: this.data.ids
    })
    this.getAllMoney()
  },

  allChoose(){
    let that = this
    this.data.info.map(r => {
      if (!this.data.check) {
        this.data.ids[r.id] = !this.data.check
      } else {
        delete this.data.ids[r.id]
      }
    })
    that.setData({
      check: !this.data.check,
      ids: this.data.ids
    })
    this.getAllMoney()
  },

  checkboxChange(e){
    this.data.ids = {}
    e.detail.value.map(id => {
      this.data.ids[id] = true
    })
    this.setData({
      check: e.detail.value.length === this.data.info.length,
      subInfo: e.detail.value
    })
    this.getAllMoney()
  },

  toPay(){
    const temp = this.data.info.filter(v => Object.keys(this.data.ids).some(r => r === v.id))
    if (temp.length) {
      let obj = {
        totalMoney: this.data.allMoney,
        arr: temp
    }
      console.log(obj)
      obj = JSON.stringify(obj)
      wx.navigateTo({
        url: '../pay/index?info=' + obj,
      })
    } else {
      wx.showToast({
        title: ' 您购物车里没有需要结算的商品',
        icon: 'none'
      })
    }
  },

  del(e){
    let that = this
    let index = e.currentTarget.dataset.n
    app.request({
      url:'/content/api/cart-delete',
      data:{
        uid:app.globalData.userInfo.id,
        productIds: that.data.info[index].id
      },
    }).then(res=>{
      wx.showToast({
        title: '删除成功',
        type: 'success'
      })
      app.request({
        url: '/content/api/user-cart',
        data: {
          uid: app.globalData.userInfo.id
        }
      }).then(res => {
        that.setData({
          info: res.data
        })
      })
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
    app.request({
      url: '/content/api/user-cart',
      data: {
        uid: app.globalData.userInfo.id
      }
    }).then(res => {
      that.setData({
        info: res.data
      })
    })
    console.log(this.data.subInfo)
    this.data.info.map(r=>{
      if(r.checked = true){

      }
    })
    this.data.allMoney
  },
})