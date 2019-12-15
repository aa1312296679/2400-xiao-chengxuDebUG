const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//地理信息检索失败
const locationFail = function (data) {
  console.log(data);
};

//地理信息检索成功
const locationSuccess = function(data){
  // 获取城市信息
  var city=data.originalData.result.addressComponent.city;
  // console.log(this.globalData.location)
  this.globalData.location= city;
}

module.exports = {
  formatTime: formatTime,
  locationFail: locationFail,
  locationSuccess: locationSuccess
}
