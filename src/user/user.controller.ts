import * as bcrypt from 'bcrypt';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}


    //TODO: user를 바로 반환하지 않게 바꾸기
    @Get(':username')
    async getUser(@Param('username') username: string): Promise<User> {
        return await this.userService.getOneByUsername(username);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<{created: boolean, message?: string}> {
        return await this.userService.registerUser(createUserDto);
    }

    @Patch(':username')
    async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<{updated: boolean, message?: string}> {
        return await this.userService.updateUser(updateUserDto);
    }

    @Delete(':username')
    async deleteUser(@Param('username') username: string): Promise<{deleted: boolean, message?: string}> {
        return await this.userService.deleteOne(username); 
    }
}
