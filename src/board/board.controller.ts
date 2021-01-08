import { Body, Controller, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guards';

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

    @Get()
    async getBoardByUsername(@Param('username') username: string) {
        return await this.boardService.getByUser(username);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async postBoard(@Body() boardDto: CreateBoardDto, @Request() req) {
        const username: string = req?.user?.username;
        if(!username) {
            throw new UnauthorizedException('Failed to get username');
        }
        return await this.boardService.insertOne(username, boardDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateBoard(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto, @Request() req) {
        const username: string = req?.user?.username;
        if(!username) {
            throw new UnauthorizedException('Failed to get username');
        }
        return await this.boardService.updateOne(username, id, updateBoardDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async deleteBoard(@Param('id') id: number, @Request() req) {
        const username: string = req?.user?.username;
        if(!username) {
            throw new UnauthorizedException('Failed to get username');
        }
        return await this.boardService.deleteOne(username, id);
    }
}
