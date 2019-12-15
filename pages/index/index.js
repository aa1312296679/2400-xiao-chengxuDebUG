//index.js
//获取应用实例
const app = getApp()
//全屏缓冲
var screenTimer=false;
//播放中的视频控件控件id
var activeVideoId="";
//播放中的视频控件控件索引
var activeControlIndex=-1;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    content:'',
    goodProduct:[],
    locationText: "",//地理位置文字信息
    locationIco: "", //地理位置图标信息
    searchName:"",//搜索名称
    bnrUrl: [  //0图片 1视频 获取数据信息后对数据结构重构为该形式
      { id: '01', url:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",type:1},
      { id: '02', url: "/mock/img/木马首页_04.png", type:0 }
    ],
    isVedioScreen:false, //视频全屏状态 true全屏 false非全屏
    activeControlIndex: -1 //播放中的视频控件控件
  },
 
  onShow(){
       //读取城市信息
       app.watch(app,this.locationHandle,'location'); 
  },
  /**
   * 地理位置信息处理
   * ** */
  locationHandle(localtion){
    let { infor, ico } = localtion;
    
    this.setData({
      locationText: infor,
      locationIco:ico
    })
    console.log(this.data.locationIco);
    console.log(this.data.locationText);
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
  /**
   * 全屏事件
   * **/
  openScreenHandle(e){
    //视频控件
    let tempVideo;
    //获取被点击的视频控件索引
    let tempVedioIndex=e.currentTarget.dataset.index;
    //视频控件id前缀
    let tempVedioIdFirst ="myVideo";
    //视频控件id
    let tempVedioId="";

    //终止上一次未终止的轮播视频
    if (tempVedioIndex !== this.data.activeControlIndex && this.data.activeControlIndex!==-1){
      // 获取上次播放的视频的视频id
      tempVedioId = tempVedioIdFirst + this.data.activeControlIndex
      //  停止上次播放的视频
      this.vedioHandle(tempVedioId, false)
    }
      
    //获取被点击的视频控件的控件id
    activeVideoId = e.currentTarget.dataset.vedioid;   
    //更新播放中的播放控件索引
    this.data.activeControlIndex = tempVedioIndex;
    //获取播放中的播放控件的控件id
    tempVedioId = tempVedioIdFirst + this.data.activeControlIndex
    //播放更新后的播放内容
    this.vedioHandle(tempVedioId, true);
    // 启用全屏状态
    this.screenPlay(true);                          
  },
   /***
    * 退出全屏事件
    **/
    closeScreenHandle(e){
      // 退出全屏
      this.screenPlay(false); 
    },
  /**
   * 全屏播放处理/退出全屏处理
   * @param isScreen 全屏状态 true 全屏，false非全屏
   * **/ 
  screenPlay(isScreen){
    //限制执行频率
    if (screenTimer){
      return false;
    }

    screenTimer=setTimeout(()=>{
      //进入全屏或退出全屏
      this.data.isVedioScreen = isScreen;
      this.setData({
        isVedioScreen:this.data.isVedioScreen
      })
    
      clearTimeout(screenTimer);
      screenTimer=null;
    },50);
  },
  /***
   *视频播放或停止
   * @param vedioId 视频控件id
   * @param vedioState true播放,false停止 
   */
  vedioHandle(vedioId,vedioState){
    //获取视频控件
    let tempVideo = wx.createVideoContext(vedioId, this);
    //播放视频内容或停止视频内容
    vedioState ? tempVideo.play():tempVideo.stop(); 
  }
})
