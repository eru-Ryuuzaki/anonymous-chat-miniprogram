// pages/characterInfo/characterInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anonymousRole: null,
    anonymousRoleIdx: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const anonymousRoleIdx = options.anonymousRoleIdx;
    this.setData({
      anonymousRole: getApp().globalData.characterList[anonymousRoleIdx]
    })
    console.log(`anonymousRoleIdx = ${anonymousRoleIdx}, anonymousRole = ${this.data.anonymousRole}`)
    wx.setNavigationBarTitle({
      title: this.data.anonymousRole.name
    })
  },
})