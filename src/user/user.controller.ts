import * as bcrypt from 'bcrypt';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}


    @Get(':username')
    async getUser(@Param('username') username: string) {
        return await this.userService.getOneByUsername(username);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.registerUser(createUserDto);
    }

    @Patch(':username')
    async updateUser(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(updateUserDto);
    }
}
