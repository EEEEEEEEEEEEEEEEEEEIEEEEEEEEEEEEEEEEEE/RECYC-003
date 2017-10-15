//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    course: {},
    dating: {}
  },
  onLoad: function (options) {
    var that = this
    console.log(options.course_id)
    wx.request({
      url: "http://localhost:9002/v1/courses/detail",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413',
        course_id: options.course_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.course)
        that.setData({
          course: res.data.course
        })
        console.log(that.data.course)
      }
    })
    wx.request({
      url: "http://localhost:9002/v1/datings/course",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413',
        course_id: options.course_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.dating)
        that.setData({
          dating: res.data.dating
        })
        console.log(that.data.dating)
      }
    })
  }
})
