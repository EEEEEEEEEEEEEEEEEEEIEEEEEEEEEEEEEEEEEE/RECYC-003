//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    coachs: []
  },
  onLoad: function (options) {
    var that = this
    that.data.coachs = []
    wx.request({
      url: "http://localhost:9002/v1/coachs",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          coachs: res.data.coachs
        })
        console.log(that.data.coachs)
      }
    })
  },
  onShow: function(options) {
  
  }  
})
