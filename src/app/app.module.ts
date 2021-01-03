import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../middleware/logger.middleware'
import { BoardModule } from '../board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import configuration from '../configuration/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BoardModule,
    ConfigModule.forRoot({
      load: [configuration],    //configuration 디렉토리의 설정 파일을 로드한다
      isGlobal: true    //모든 모듈에서 설정을 가져올 수 있도록 허락한다
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',   //type은 TypeOrm 설정에서 드라이버를 고르기 위한 설정값으로, config를 사용할 수 없다
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: ["dist/**/*.entity{ .ts,.js}"],   //dist에 컴파일된 모든 엔티티 파일을 사용한다
        synchronize: configService.get<boolean>('database.synchronize'),
      })
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
