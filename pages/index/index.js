//index.js
//获取应用实例
const app = getApp()
//全屏缓冲
var screenTimer=false;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    content:'',
    goodProduct:[],
    searchName:"",//搜索名称
    bnrUrl: [  //0图片 1视频 获取数据信息后对数据结构重构为该形式
      { id: '01', url:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",type:1,muted:true,screen:false},
      { id: '02', url: "/mock/img/木马首页_04.png", type:0 }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToUrl(e) {
    console.log(e)
    if (e.currentTarget.dataset.imageurl) {
      wx.navigateTo({
        url: e.currentTarget.dataset.imageurl,
      })
    }
  },
  onLoad: function (options) {
    if (options.code) {
      wx.setStorage({
        key: 'code',
        data: options.code,
      })
    }
    var that = this
    wx.request({
      url: `${app.globalData.host}/content/api/home-index`,
      method:'post',
      data:{
        page: 1
      },
      success:(res)=>{
        console.log(res.data)
        // console.log
        // this.setData({
        //   bnrUrl:res.data.data.advert,
        //   content: res.data.data.logo.content,
        //   goodProduct: res.data.data.goodProduct
        // })
        // console.log(res)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 搜索处理
   **/
  search(e){
    console.log("search按钮");
    let search = e.detail.value
   
    wx.request({
      url: `${app.globalData.host}/content/api/index-search`,
      method:'post',
      data:{
        search: search
      },
      success:(res)=>{
        console.log(res);
        // if (res.data.code === 1) {
        //   this.setData({
        //     goodProduct: res.data.data
        //   })
        // }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  videoHandle(e){
    //获取被点击的视频控件的控件id
    let videoId=e.currentTarget.dataset.vedioid;   
    //获取控件索引
    let controlIndex = e.currentTarget.dataset.index;
    // console.log(controlIndex); 
    this.screenPlay(videoId, controlIndex);                          
  },
  /**
   * 全屏播放
   * @param id 视频控件的控件id
   * @param index 视频控件的控件索引
   * **/ 
  screenPlay(id,index){
    //限制执行频率
    if (screenTimer){
      console.log("----");
      return false;
    }

    screenTimer=setTimeout(()=>{
      //启用视频声音或关闭视频声音
      this.data.bnrUrl[index].muted = !this.data.bnrUrl[index].muted;
      //全屏或关闭全屏
      this.data.bnrUrl[index].screen = !this.data.bnrUrl[index].screen;
      //
      console.log(this.data.bnrUrl);
      this.setData({
        bnrUrl: this.data.bnrUrl
      })
      clearTimeout(screenTimer);
      screenTimer=null;
    },500);
    
    //执行全屏方法
    // var videoContent=wx.createVideoContext(id,this);
    // console.log(videoContent);
    // videoContent.requestFullScreen();
  }
})
