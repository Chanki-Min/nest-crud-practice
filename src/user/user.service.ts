import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user-dto';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne(username);
  }

  async getOneByEmailAddress(email: string): Promise<User> {
    return this.userRepository.findOne(email);
  }

  async registerUser(dto: CreateUserDto): Promise<{created: boolean, message?: string}> {
    try {
      dto.password = await bcrypt.hash(dto.password, saltOrRounds);
    } catch (e) {
      throw e;
    }

    const newUser: User = this.userRepository.create(dto);
    try {
      if((await this.userRepository.findOne(newUser.username))) {
        throw new BadRequestException(`duplicated user`);
      }
      await this.userRepository.save(newUser);
    } catch(e) {
      return {created: false, message: e.message};
    }
    return {created: true};
  }

  async updateUser(dto: UpdateUserDto): Promise<{updated: boolean, message?: string}> {
    if(dto.password) {
      try {
        dto.password = await bcrypt.hash(dto.password, saltOrRounds);
      } catch (e) {
        return {updated: true, message: e.message};
      }
    }

    const currentUser: User = await this.userRepository.findOne(dto.username);
    if(!currentUser) {
      return {updated: false, message: 'cannot find user to update'};
    }

    try {
    await this.userRepository.update(dto.username, dto);
    } catch(e) {
      return {updated: true, message: e.message};
    }
    return {updated: true}
  }

  async deleteOne(username: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.userRepository.delete(username);
      return { deleted: true };
    } catch (e) {
      return { deleted: false, message: e.message };
    }
  }
}
