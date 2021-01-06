import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strateges/local.stratege';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { JwtStrategy } from './strateges/jwt.stretege';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
