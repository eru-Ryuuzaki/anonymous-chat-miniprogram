// pages/rooms/rooms.js
import {
  request
} from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 放假列表数据
    roomList: [{
      name: "客服机器人",
      membersCount: 1,
      creator: "管理员",
      roomId: 0
    }, ],
    // 被分配的角色资料
    anonymousRole: null,
    // 输入框内容
    inputRoomContent: "",
    // 目前要展示的房间列表
    showRoomList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '聊天房间列表'
    })
    this.setData({
      anonymousRole: getApp().globalData.anonymousRole
    })
    this.getRoomList();
    // 注册回调事件，对于不同的事件类型执行不同的操作(后续事件多起来之后可以用 switch 来代替好看点)
    getApp().globalData.handleMessage((msg) => {
      console.log(msg);
      const data = JSON.parse(msg.data)
      // 更新房间列表信息
      if (data.event == "updateRoomList") {
        this.getRoomList();
      } else if (data.event == "newMessage") {
        // 收到新的信息
        const msg = getApp().globalData.allMessage;
        if (!msg[data.data.roomId]) {
          msg[data.data.roomId] = [];
        }
        msg[data.data.roomId].push(data.data);
      }
    });
  },
  // 附带上房间号跳转到响应的房间里
  toChat(e) {
    // console.log(e)
    wx.navigateTo({
      url: `../chat/chat?title=${e.currentTarget.dataset.obj.name}&roomId=${e.currentTarget.dataset.obj.roomId}`
    })
  },
  // 搜索房间
  searchRoom() {
    const tmp = this.data.roomList.filter((item) => {
      return item.name.includes(this.data.inputRoomContent);
    })
    this.setData({
      showRoomList: tmp,
      inputRoomContent: ""
    })
  },
  // 获取输入框内容
  bindRoomContent(e) {
    this.setData({
      inputRoomContent: e.detail.value
    })
  },
  // 增加房间
  addRoom() {
    if (!this.data.inputRoomContent) return
    request({
      url: 'rooms/addRooms',
      method: 'post',
      data: {
        name: this.data.inputRoomContent,
        creator: this.data.anonymousRole.name,
      }
    }).then(res => {
      const tmp = this.data.roomList.slice(0, 1).concat(res);
      this.setData({
        showRoomList: tmp,
        roomList: tmp,
        inputRoomContent: ""
      })
    })
  },
  // 获取房间列表
  getRoomList() {
    request({
      url: 'rooms/roomList'
    }).then(res => {
      const tmp = this.data.roomList.slice(0, 1).concat(res);
      this.setData({
        showRoomList: tmp,
        roomList: tmp
      })
    })
  },
  // 跳转到详情资料卡
  getDetailInfo() {
    wx.navigateTo({
      url: `../characterInfo/characterInfo?anonymousRoleIdx=${getApp().globalData.anonymousRoleIdx}`
    })
  },
  // 删除房间
  delRoom(e) {
    const roomId = e.currentTarget.dataset.obj.roomId;
    console.log(`roomId = ${roomId}`)
    wx.showModal({
      title: '提示',
      content: '确定要删除该房间吗？',
      success(res) {
        if (res.confirm) {
          if (roomId == 0 || roomId == 1) {
            wx.showToast({
              title: '无权限',
              icon: 'error',
              duration: 2000
            })
            return;
          }
          request({
            url: 'rooms/delRooms',
            method: 'delete',
            data: {
              roomId: roomId
            }
          }).then((res) => {
            console.log(res)
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 2000
            })
          })

        } else if (res.cancel) {

        }
      }
    })
  }
})