/**
 * 监听globalData的异步属性
 * @param app 应用实例
 * @param method 回调处理函数
 * @param globalDataName 需要监听的异步属性名
 * ** */
module.exports = (app,method, globalDataName)=> {
  var obj = app.globalData;
  Object.defineProperty(obj, globalDataName, {
    configurable: true,
    enumerable: true,
    set: function (value) {
      app['_' + globalDataName] = value;
      method(value);
    },
    get: function () {
      return app['_' + globalDataName]
    }
  })
}