//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    courses: [],
    types: [
      {
        name: '减脂',
        sel: ''
      },
      {
        name: '增肌',
        sel: ''
      }, 
      {
        name: '塑性',
        sel: ''
      }, 
      {
        name: '瑜伽',
        sel: ''
      }, 
      {
        name: '搏击',
        sel: ''
      } 
    ],
  },
  onLoad: function (options) {
    if (getApp().data.courseType == -1 ) {
      getApp().data.courseType = 0
    }
    var that = this
    wx.request({
      url: "http://localhost:9002/v1/courses",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413',
        course_type: getApp().data.courseType
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          courses: res.data.courses
        })
      }
    })
    console.log(this.data.courses)
  },
  onShow: function(options) {
    var that = this
    var typesInfo = this.data.types
    for (var i = 0; i < typesInfo.length; i++) {
      typesInfo[i].sel = ''
    }
    this.setData({
      types: typesInfo
    })
    console.log(this.data.types)
    var courseType = getApp().data.courseType
    console.log(courseType)
    if (courseType == -1) {
      that.setData({
        'types[0].sel': 'sel'
      })
      getApp().data.courseType = 0
    } else {
      var param = {}
      var string = 'types[' + courseType + '].sel'
      param[string] = 'sel'
      that.setData(param)
    }

    this.data.courses = []
    wx.request({
      url: "http://localhost:9002/v1/courses",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413',
        course_type: getApp().data.courseType
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          courses: res.data.courses
        })
      }
    })
    console.log(this.data.courses)
  },
  type: function(event) {
    var typesInfo = this.data.types
    for (var i = 0; i<typesInfo.length; i++) {
      typesInfo[i].sel = ''
    }
    this.setData({
      types: typesInfo
    })
    console.log(this.data.types)

    var param = {}
    var string = 'types[' + event.currentTarget.id + '].sel'
    param[string] = 'sel'
    this.setData(param)
    console.log(this.data.types)
    getApp().data.courseType = event.currentTarget.id

    this.setData({
      courses: []
    })
    console.log(this.data.courses)
    var that = this
    wx.request({
      url: "http://localhost:9002/v1/courses",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413',
        course_type: event.currentTarget.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          courses: res.data.courses
        })
        console.log(that.data.courses)
      }
    })
  }  
})
