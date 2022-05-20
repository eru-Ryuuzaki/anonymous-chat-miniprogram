import {
  request
} from '../../utils/request'

Page({
  //定义初始化数据  每当数据发生变化时，会自动触发页面循环
  data: {
    // 角色信息
    anonymousRole: {},
    // 房间 id
    roomId: null,
    // 输入框的内容
    inputValue: '',
    // 当前房间的消息列表
    allContentList: [],
    //图灵机器人秘钥
    key: "d13b441029804ee99fc4e3b617a5f557",
  },
  //绑定键盘按下事件，讲输入的值赋给data
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //点击发送按钮时触发事件，发送数据给图灵机器人
  submitTo: function (e) {
    let that = this;
    //将输入数据追加到列表里面
    let params = {
      "value": that.data.inputValue,
      "name": that.data.anonymousRole.name,
      "avatar": that.data.anonymousRole.avatar,
      "roomId": that.data.roomId
    }
    // 如果当前房间号是 0 的话，那么就是往图灵机器人那边发送消息而不是往自己服务器发送消息
    if (this.data.roomId == 0) {
      that.data.allContentList.push(params);
      getApp().globalData.allMessage[0] = that.data.allContentList
      //图灵接口
      let _url = `http://www.tuling123.com/openapi/api`;
      // let _url = ''
      //系统封装的请求方法 ，注意这里没有ajajx的说法
      wx.request({
        url: _url,
        data: {
          key: that.data.key,
          info: that.data.inputValue
        },
        //封装返回数据格式
        header: {
          'Content-Type': 'application/json'
        },
        //请求成功的回调
        success: function (res) {
          let data = res.data;
          if (data.code === 100000) { //100000 表示返回成功
            //将返回值追加到列表
            const tmp = {
              "value": data.text,
              "name": "机器人",
              "avatar": "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9527b812c9f149afa35d2cbc8eab6be3~tplv-k3u1fbpfcp-watermark.image?",
              "roomId": 0
            }
            that.data.allContentList.push(tmp)
            // 判空
            if (!getApp().globalData.allMessage[that.data.anonymousRole.roomId]) {
              getApp().globalData.allMessage[that.data.anonymousRole.roomId] = []
            }
            getApp().globalData.allMessage[that.data.anonymousRole.roomId].push(tmp)
            //调用set方法，告诉系统数据已经改变   启动循环，循环聊天信息
            that.setData({
              inputValue: ""
            })
          }
        }
      })
    } else {
      // 如果当前房间号不是 0 的话，那么就是往自己服务器发送消息
      request({
        url: 'rooms/sentMessage',
        method: 'post',
        data: params
      }).then(res => {
        console.log("allmsg", getApp().globalData.allMessage);
        this.setData({
          inputValue: "",
        })
      })
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      anonymousRole: getApp().globalData.anonymousRole,
      roomId: options.roomId
    })
    // 进房间自动发送角色签名
    request({
      url: 'rooms/sentMessage',
      method: 'post',
      data: {
        roomId: options.roomId,
        ...this.data.anonymousRole,
        value: this.data.anonymousRole.remark
      }
    }).then(res => {
      console.log("allmsg", getApp().globalData.allMessage);
    })
    // 通知服务器该房间人数加一
    
    // 消息轮询
    // 这里没找到好的解决方案，到时候再想
    this.setData({
      allContentList: getApp().globalData.allMessage[options.roomId] ? getApp().globalData.allMessage[options.roomId] : []
    })

    setInterval(() => {
      this.setData({
        allContentList: getApp().globalData.allMessage[options.roomId] ? getApp().globalData.allMessage[options.roomId] : []
      })
    }, 200)
  },
  getDetailInfo(e) {
    // 如果现在在是在机器人聊天，那么就停止跳转到资料卡
    if (e.currentTarget.dataset.role.name === "机器人") return
    let idx = getApp().globalData.characterList.find(item => item.name == e.currentTarget.dataset.role.name).anonymousRoleIdx
    wx.navigateTo({
      url: `../characterInfo/characterInfo?anonymousRoleIdx=${idx}`
    })
  }
})