//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    types: [
      {
        name: '瘦身',
        img: '../../images/home/pic1.png',
        type: 0
      },
      {
        name: '增肌',
        img: '../../images/home/pic2.png',
        type: 1
      },
      {
        name: '塑性',
        img: '../../images/home/pic3.png',
        type: 2
      },
      {
        name: '更多',
        img: '../../images/home/pic4.png',
        type: -1
      }
    ],
    indexTypes: [
      {
        name: '健身房',
        sel: 'sel',
        display: 'block'
      },
      {
        name: '课程',
        sel: '',
        display: 'none'
      },
      {
        name: '教练',
        sel: '',
        display: 'none'
      }
    ],
    comapnies: [],
    courses: [],
    coachs: [],
    coachsRanking: [],
    user: {}
  },
  onLoad: function(options) {
    getApp().data.user = {}
    getApp().data.courseType = 0
    getApp().data.indexTypes = 0

    var that = this
    that.data.courses = []
    wx.request({
      url: "http://localhost:9002/v1/companies",
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
          companies: res.data.companies
        })
        console.log(that.data.companies)
      }
    })
    var coachs = []
    var coachsRanking = []
    wx.request({
      url: "http://localhost:9002/v1/coachs/ranking",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.coachs)
        coachs = res.data.coachs
        for (var i=0;i<3;i++) {
          var ranking = coachs[i].coach_ranking
          if (ranking == 1) {
            coachsRanking[0] = coachs[i]
          }else if (ranking == 2) {
            coachsRanking[1] = coachs[i]
          }else if (ranking == 3) {
            coachsRanking[2] = coachs[i]
          }
        }
        that.setData({
          coachsRanking: coachsRanking
        })
        console.log(that.data.coachsRanking)
      }
    })
    wx.request({
      url: "http://localhost:9002/v1/users",
      data: {
        uid: '3',
        timestamp: '1505966206074',
        token: '8047159d09a8e7268ae03989b25b5413',
        user_id: '1'
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          user: res.data.user
        })
        console.log(that.data.user)
        var user_sex = that.data.user.user_sex
        var sex = ''
        if (user_sex == 0) {
          sex = '未知'
        } else if (user_sex == 1) {
          sex = '男'
        } else if (user_sex == 2) {
          sex = '女'
        }
        that.setData({
          'user.user_sex': sex
        })
        console.log(that.data.user.user_sex)

        var user_shape = that.data.user.user_shape
        var shape = ''
        if (user_shape == 0) {
          shape = '标准型'
        } else if (user_shape == 1) {
          shape = '肥胖型'
        } else if (user_shape == 2) {
          shape = '瘦弱型'
        }
        that.setData({
          'user.user_shape': shape
        })
        console.log(that.data.user.user_shape)

        getApp().data.user = that.data.user
        console.log(getApp().data.user)
      }
    })

  },
  goType(event) {
    getApp().data.courseType = event.currentTarget.id
    console.log(getApp().data.courseType)
    wx.switchTab({
      url: '../course/course'
    })
  },
  indexType(event) {
    var typesInfo = this.data.indexTypes
    for (var i = 0; i < typesInfo.length; i++) {
      typesInfo[i].sel = ''
      typesInfo[i].display = 'none'
    }
    this.setData({
      indexTypes: typesInfo
    })
    console.log(this.data.indexTypes)

    var param = {}
    var selString = 'indexTypes[' + event.currentTarget.id + '].sel'
    var displayString = 'indexTypes[' + event.currentTarget.id + '].display'
    param[selString] = 'sel'
    param[displayString] = 'block'
    this.setData(param)
    console.log(this.data.indexTypes)
    getApp().data.indexTypes = event.currentTarget.id

    var that = this
    if(event.currentTarget.id == 0) {
      that.data.companies = []
      wx.request({
        url: "http://localhost:9002/v1/companies",
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
            companies: res.data.companies
          })
          console.log(that.data.companies)
        }
      })
    } else if (event.currentTarget.id == 1) {
      that.data.courses = []
      wx.request({
        url: "http://localhost:9002/v1/courses/all",
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
            courses: res.data.courses
          })
          console.log(that.data.courses)
        }
      })
    } else if (event.currentTarget.id == 2) {
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
    } else {

    }
  }
})
