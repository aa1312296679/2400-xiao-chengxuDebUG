// pages/componts/goodlist/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    viewDetails() {
      wx.redirectTo({
        url: '/pages/goodsinfo/index?id=' + this.properties.productData.id,
      })
    }
  }
})
