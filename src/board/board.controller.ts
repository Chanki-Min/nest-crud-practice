import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {};

    @Get()
    async getAllBoards() {
        return await this.boardService.getAll();
    }

    @Get(':id')
    async getBoard(@Param('id') id: number) {
        return await this.boardService.getOne(id);
    }

    @Post()
    async postBoard(@Body() boardDto: CreateBoardDto) {
        return await this.boardService.insertOne(boardDto);
    }

    @Patch(':id')
    async updateBoard(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
        return await this.boardService.updateOne(id, updateBoardDto);
    }
}
