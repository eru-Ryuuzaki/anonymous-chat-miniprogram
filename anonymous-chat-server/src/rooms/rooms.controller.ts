import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @Get('roomList')
  getUserInfo(): string {
    return this.roomsService.getAllRooms();
  }

  @Post('addRooms')
  addRooms(@Body() roomInfo): string {
    // console.log(loginParmas);
    return this.roomsService.addRooms(roomInfo);
  }

  @Post('sentMessage')
  sentMessage(@Body() msg): string {
    console.log(msg);
    return this.roomsService.sentMessage(msg);
  }
  @Delete('delRooms')
  delRooms(@Body() body): number {
    return this.roomsService.delRooms(body.roomId);
  }
}
