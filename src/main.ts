import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BoardModule } from './board/board.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  //decorator가 붙어있지 않은 body의 attribute를 제거하고 컨트롤러에 넘긴다.
      forbidNonWhitelisted: true, //whitelist로 걸러질 attribute가 있는 요청을 컨트롤러에 넘기지 않는다.
      transform: true,  //request의 parameter type을 typescript에 명시한 자료형으로 변환한다.
    })
  )
  await app.listen(3000);
}
bootstrap();
