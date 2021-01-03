import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',      //http post body에 있을 username 필드의 이름을 지정
            passwordField: 'passwordHash',      //http post body에 있을 password 필드의 이름을 지정
        });
    }

    async validate(username: string, passwordHash: string): Promise<any> {
        const user = this.authService.validateUser(username, passwordHash);
        if(!user) {
            throw new UnauthorizedException();
        } else {
            return user;
        }
    }
}