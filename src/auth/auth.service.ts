import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService, 
      ) {}

    async validateUser(username: string, passwordHash: string): Promise<any> {
        const user = await this.userService.getOneByUsername(username);

        if (user && user.passwordHash === passwordHash) {
          const { passwordHash, ...result } = user;
          return result;
        }
        return null;
      }

    async makeJwtToken(user: User) {
      const payload = {username: user.username, sub: user.emailAddress};
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
}
