import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('userInfo')
  getUserInfo(): number {
    // return "All User's Info"; // [All User's Info] 暂时代替所有用户的信息
    // console.log(JSON.stringify(character), character);
    return this.userService.getUserInfo();
  }
  @Get('characterList')
  getCharacterList(): string {
    // return "All User's Info"; // [All User's Info] 暂时代替所有用户的信息
    // console.log(JSON.stringify(character), character);
    return this.userService.getCharacterList();
  }
}
