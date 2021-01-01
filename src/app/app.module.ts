import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../middleware/logger.middleware'
import { BoardModule } from '../board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot(),
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
