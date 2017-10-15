//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    company: {}
  },
  onLoad: function(options) {
    var that = this
    wx.request({
      url: "http://localhost:9002/v1/companies/id",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413',
        id: options.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          company: res.data.company[0]
        })
        console.log(that.data.company)
      }
    })
  }
})
