//获取应用实例
const app = getApp()

Page({
  data: {
    news: []
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: "http://localhost:9002/v1/news",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.news)
        that.setData({
          news: res.data.news
        })
        console.log(that.data.news)
      }
    })
  }
})
