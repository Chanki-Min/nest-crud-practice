import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import * as faker from 'faker';

const boardList = [ 
  new Board(faker.name.firstName(), faker.lorem.sentence(), faker.lorem.sentences(3)),
  new Board(faker.name.firstName(), faker.lorem.sentence(), faker.lorem.sentences(3)),
  new Board(faker.name.firstName(), faker.lorem.sentence(), faker.lorem.sentences(3)),
]

const oneBoard: Board = new Board(faker.name.firstName(), faker.lorem.sentence(), faker.lorem.sentences(3));


describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),   //BoardRepository의 토큰을 모킹된 레포지토리의 이름으로 삼는다
          useValue: {
            find: jest.fn().mockResolvedValue(boardList),   //jest를 활용하여 데이터베이스를 모킹한다
            findOne: jest.fn().mockResolvedValue(oneBoard),
            create: jest.fn().mockResolvedValue(oneBoard),
            save: jest.fn().mockImplementation((board: Board) => board),
            update: jest.fn().mockImplementation((board: Board) => board),
            delete: jest.fn()
          }
        },
      ]
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get(getRepositoryToken(Board));
  });

  it('should be defined', () => {
    expect(boardService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all boards', async () => {
      const result = await boardService.getAll();
      expect(result).toEqual(boardList);
    });
  });

  describe('getOne', () => {
    it('should return one board with correnct id', async () => {
      const repoSpy = jest.spyOn(boardRepository, 'findOne');
      const result = await boardService.getOne(1);
      expect(result).toEqual(oneBoard);
    });
  });

  describe('insertOne', () => {
    it('should save a board to repository', async () => {
      const createBoardDto: CreateBoardDto = {
        author: faker.name.firstName(),
        title: faker.lorem.sentence(),
        content: faker.lorem.sentences(3)
      };
      
      expect(
          boardService.insertOne(createBoardDto)
      ).resolves.toEqual(oneBoard);
      expect(boardRepository.create).toBeCalledTimes(1);
      expect(boardRepository.create).toBeCalledWith(createBoardDto);
      expect(boardRepository.save).toBeCalledTimes(1);
    });
  });

  describe('updateOne', () => {
    it('should call update method', async () => {
      const board = await boardService.updateOne(1, {
          title: ""
      });
      expect(board).toEqual(oneBoard);
      expect(boardRepository.update).toBeCalledTimes(1);
      expect(boardRepository.update).toBeCalledWith(1, {
        title: ""
      });
    });
  });

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(boardService.deleteOne(1)).resolves.toEqual({ deleted: true });
    });

    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest
        .spyOn(boardRepository, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(boardService.deleteOne(1)).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repoSpy).toBeCalledWith(1);
      expect(repoSpy).toBeCalledTimes(1);
    });
  });

});
