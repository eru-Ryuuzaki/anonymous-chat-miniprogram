import { Injectable } from '@nestjs/common';
import * as character from '../../../public/data/character.json';
// 记录哪些角色被用了
const _character = Object.values(character);
const characterCount = _character.length;
// 给每个角色都加上一个 anonymousRoleIdx 字段
for (let idx = 0; idx < characterCount; idx++) {
  // @ts-ignore
  _character[idx].anonymousRoleIdx = idx;
}
// console.log(JSON.stringify(_character));
// console.log(_character);
let vis = new Array(characterCount).fill(false);
// let nowMem = 0;
@Injectable()
export class UserService {
  getUserInfo(): number {
    // console.log(`目前人数： ${nowMem}`);
    // if (nowMem + 1 > characterCount) {
    //   return -1;
    // }
    // nowMem++;
    while (true) {
      let tmpNum = ~~(Math.random() * characterCount);
      // 目前先随机返回，不管重复
      return tmpNum;
      if (!vis[tmpNum]) {
        vis[tmpNum] = true;
        return tmpNum;
      }
    }
  }
  getCharacterList(): string {
    return JSON.stringify(_character);
  }
}
