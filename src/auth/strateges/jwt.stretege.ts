import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    /*
    이 함수는 Passport가 jwt의 유효성을 검증하고 실행되므로, 다른 작업을 수행할 필요가 없다
    추후 stateful한 JWT를 구성하고 싶다면 여기에 비즈니스 로직을 추가할 수 있다
    */
    return { emailAddress: payload.sub, username: payload.username };
  }
}