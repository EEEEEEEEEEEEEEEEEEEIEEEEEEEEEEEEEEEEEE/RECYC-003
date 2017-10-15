//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    user: {}
  },
  onLoad: function(options) {
    this.setData({
      user: getApp().data.user
    })
    console.log(this.data.user)
  }
})
