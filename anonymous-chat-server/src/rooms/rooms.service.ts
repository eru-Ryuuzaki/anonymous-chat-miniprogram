import { Injectable } from '@nestjs/common';
// console.log('启动时自动执行'); // √

import { WebSocketServer } from 'ws';

let roomsList = [
  { membersCount: 0, roomId: 1, creator: 'Ryuuzaki', name: '公共聊天室' },
];
let nowRoomId = 2;

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws) {
  console.log('socket 已启动');
  roomsList.forEach((item) => {
    if (item.roomId == 1) {
      item.membersCount++;
    }
  });
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({ event: 'updateRoomList' }));
  });
  ws.on('message', function message(data) {
    let msg = Buffer.from(data).toString();
    console.log('received: %s', msg);
  });
  ws.on('close', function () {
    roomsList.forEach((item) => {
      if (item.roomId == 1) {
        item.membersCount--;
      }
    });
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({ event: 'updateRoomList' }));
    });
  });
});

@Injectable()
export class RoomsService {
  // 获取房间列表
  getAllRooms(): any {
    return roomsList;
  }
  // 增加房间
  addRooms(room: { name: string; creator: string }): any {
    roomsList.push(
      Object.assign(room, { roomId: nowRoomId++, membersCount: 0 }),
    );
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({ event: 'updateRoomList' }));
      console.log('更新房间列表!');
    });
    return roomsList;
  }
  // 消息广播
  sentMessage(msg: {
    roomId: number;
    name: string;
    avatar: string;
    value: string;
  }): any {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({ event: 'newMessage', data: msg }));
      console.log('发送消息!');
    });
    return 'success';
  }
  // 删除某个房间
  delRooms(roomId: number): number {
    let idx = roomsList.findIndex((item) => item.roomId === roomId);
    if (idx == -1) return 0;
    roomsList.splice(idx, 1);
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({ event: 'updateRoomList' }));
      // console.log('更新房间列表!');
    });
    console.log('删除房间');
    return 1;
  }
}
