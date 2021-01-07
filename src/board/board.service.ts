import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        private connection: Connection,
    ) {};

    async getAll(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async getOne(id: number): Promise<Board> {
        return this.boardRepository.findOne(id);
    }

    async getByUser(username: string): Promise<Board[]> {
        return this.boardRepository.find({relations: [username]});
    }

    async insertOne(username: string, createBoardDto: CreateBoardDto): Promise<Board> {

        const newBoard = this.boardRepository.create({ username: username, ...createBoardDto });
        console.log(newBoard);

        return await this.boardRepository.save(newBoard);
    }

    async updateOne(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
        await this.boardRepository.update(id, updateBoardDto);
        return this.boardRepository.findOne(id);
    }

    async deleteOne(id: number): Promise<{ deleted: boolean, message?: string }> {
        try {
            await this.boardRepository.delete(id);
            return {deleted: true};
        } catch(e) {
            return {deleted: false, message: e.message}
        }
    }
}
