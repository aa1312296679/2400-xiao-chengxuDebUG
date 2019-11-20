// pages/My/release/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'',
    img:[
      '../../../img/home/发布商品_07.png'
    ],
    imgBox:[],
    items: [{
      name: '维修',
      value: 1
    }, {
        name: '新车',
        value: 2
      }, {
        name: '二手车',
        value: 3
      }, ],
    itemss: [{
      name: '通用',
      value: 0
    }, {
        name: '男',
        value: 1
      }, {
        name: '女',
        value: 2
      }, ],
    productData: {
      uid: null,
      title: null,//       商品名称
      catPid: null,//      商品一级分类id
      catCid: null, //      商品二级分类id
      price: null, //      商品价格
      brand: null,//       商品品牌
      headMsg: null,//     商品封面信息（图片或视频 调对应的上传接口获取存储地址）
      voltage: null, //     商品电压值
      mileage: null,//     商品续航里程
      sex: 0,//      商品使用性别 0-通用 1-男 2-女
      image: [],//      商品图片介绍（图片上传接口存储）
      tradeAddress: null, // 商品详细地址
      type: 1,//        商品对象    1-维修 2-新车 3-二手车
      introduce: null,//   商品详情介绍
      number: null//      商品库存
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  radioChange(e) {
    this.setData({
      ['productData.type']: e.detail.value
    })
  },
  radioChanges(e) {
    this.setData({
      ['productData.sex']: e.detail.value
    })
  },
  // 图片上传
  imgUp(){
    var that = this
    wx.chooseImage({
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://lck.hzlyzhenzhi.com/content/api/upload-image', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'upload',
          success(res) {
            console.log(res)
            const data = JSON.parse(JSON.stringify(JSON.parse(res)))
            console.log(data)
            console.log(data.data.imgUrl)
            that.setData({
              ['productData.headMsg']: data.imgUrl
            })
            //do something
          },
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success(resp) {
            console.log(resp)
            that.setData({
              imgUrl: resp.path
            })
          }
        })
      }
    })
  },

  allImgUp(){
    var that = this
    wx.chooseImage({
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://lck.hzlyzhenzhi.com/content/api/upload-image', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'upload',
          success(res) {
            console.log(res)
            const data = JSON.parse(res.data)
            that.data.productData.image.push[data.imgUrl]
            console.log(data)
            //do something
          },
          fail(err) {
            console.log(err)
          }
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success(resp) {
            that.data.img.unshift(resp.path)
             that.setData({
               img: that.data.img
            })
          }
        })
      }
    })
  },
  formSubmit(e){
    console.log(e)
    console.log(this.data.productData)
    const data = e.detail.value
    this.setData({
      ['productData.title']: e.title,
      ['productData.price']: e.price,
      ['productData.number']: e.title,
      ['productData.brand']: e.brand,
      ['productData.voltage']: e.voltage,
      ['productData.mileage']: e.mileage,
      ['introduce.introduce']: e.introduce,
      ['introduce.tradeAddress']: e.tradeAddress,
    })
    // app.request({
    //   url:'/content/api/product-upload'
    // })
    // uid       用户id
    // title       商品名称
    // catPid      商品一级分类id
    // catCid      商品二级分类id
    // price       商品价格
    // brand       商品品牌
    // headMsg     商品封面信息（图片或视频 调对应的上传接口获取存储地址）
    // voltage     商品电压值
    // mileage     商品续航里程
    // sex         商品使用性别 0 - 通用 1 - 男 2 - 女
    // image       商品图片介绍（图片上传接口存储）
    // tradeAddress 商品详细地址
    // type 商品对象    1-维修 2 - 新车 3 - 二手车
    // introduce   商品详情介绍
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