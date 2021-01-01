import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {};

    findAll(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    findOne(id: number): Promise<Board> {
        return this.boardRepository.findOne(id);
    }

    createOne(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.save(createBoardDto);
    }

    updateOne(id: number, updateBoardDto: UpdateBoardDto): Promise<UpdateResult> {
        return this.boardRepository.update(id, updateBoardDto);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.boardRepository.delete(id);
    }
}
