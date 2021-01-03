import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './Guards/jwt-auth.guards';
import { LocalAuthGuard } from './Guards/local-auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.makeJwtToken(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user     //passport가 자동으로 jwt 토큰의 정보를 Request 인스턴스에 user 파라메터로 추가해준다
    }
}
