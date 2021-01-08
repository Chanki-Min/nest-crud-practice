import * as bcrypt from 'bcrypt';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guards';
import { IsSameUser } from 'src/middleware/decorator/isSameUser.decorator';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUser(): Promise<User[]> {
        return await this.userService.getAllUser();
    }


    //TODO: user를 바로 반환하지 않게 바꾸기
    @UseGuards(JwtAuthGuard)
    @Get(':username')
    async getUser(@Param('username') username: string): Promise<User> {
        return await this.userService.getOneByUsername(username);
    }

    
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<{created: boolean, message?: string}> {
        return await this.userService.registerUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':username')
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req): Promise<{updated: boolean, message?: string}> {
        const username = req?.user?.username;
        return await this.userService.updateUser(username, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Request() req): Promise<{deleted: boolean, message?: string}> {
        const username = req?.user?.username;
        return await this.userService.deleteOne(username); 
    }
}
