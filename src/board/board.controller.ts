import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {};

    @Get()
    getAllBoards() {
        return 'This route will return list of boards';
    }

    @Get(':id')
    getBoard(@Param('id') boardId: number) {
        return `This route will return a board that id : ${boardId}`;
    }

    @Post()
    postBoard(@Body() boardDto: any) {
        return boardDto;
    }

    @Patch(':id')
    updateBoard(@Param('id') id: number, @Body() updateBoardDto: any) {
        return updateBoardDto;
    }
}
