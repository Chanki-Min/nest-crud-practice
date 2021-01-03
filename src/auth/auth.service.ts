import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, passwordHash: string): Promise<any> {
        const user = await this.userService.getOneByUsername(username);

        if (user && user.passwordHash === passwordHash) {
          const { passwordHash, ...result } = user;
          return result;
        }
        return null;
      }
}
