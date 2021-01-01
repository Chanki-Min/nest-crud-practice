import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../middleware/logger.middleware'
import { BoardModule } from '../board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { Board } from '../board/entities/board.entity';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [Board],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
