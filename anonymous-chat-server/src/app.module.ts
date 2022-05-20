import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessageModule } from './message/message.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [UserModule, RoomsModule, MessageModule, WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
