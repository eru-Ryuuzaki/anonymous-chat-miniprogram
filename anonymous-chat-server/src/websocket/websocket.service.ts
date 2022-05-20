import { Injectable } from '@nestjs/common';

// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 3001 });
// // let group = [];

// wss.on('connection', function connection(ws) {
//   console.log('socket 已启动');
//   ws.on('message', function message(data) {
//     let msg = Buffer.from(data).toString();
//     console.log('received: %s', msg);
//     wss.clients.forEach(function each(client) {
//       client.send(msg);
//     });
//   });
//   ws.send('something~~~');
// });

@Injectable()
export class WebsocketService {
  //   addRooms(msg): any {
  //     wss.clients.forEach(function each(client) {
  //       client.send({ event: 'addRoom', data: msg });
  //       console.log('发送消息!');
  //     });
  //   }
}
