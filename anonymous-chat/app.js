// app.js
import {
  wsUrl
} from './myconfig'
import {
  request
} from './utils/request'
// 创建 websocket 实例
const ws = wx.connectSocket({
  url: wsUrl,
})
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取所有角色资料，方便后续查询
    request({
      url: 'user/characterList'
    }).then(res => {
      this.globalData.characterList = res
      // 获取匿名角色
      return request({
        url: 'user/userInfo'
      })
    }).then((res) => {
      this.globalData.anonymousRoleIdx = res
      this.globalData.anonymousRole = this.globalData.characterList[res]
      console.log(this.globalData.anonymousRole)
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    userInfo: null,
    // 角色对应的下标
    anonymousRoleIdx: null,
    // 被分配的角色
    anonymousRole: {},
    // 角色列表
    characterList: null,
    // websocket 实例
    ws,
    // 所有的消息
    allMessage: {},
    handleMessage(cb) {
      // cb 为监听到服务端推送的消息时，要执行的回调
      ws.onMessage((msg) => {
        cb(msg);
      })
    }
  }
})