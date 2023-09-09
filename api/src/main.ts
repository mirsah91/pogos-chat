import {NestFactory} from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {ValidationPipe} from "@nestjs/common";
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      cors: true,
  });

  app.use(morgan());

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
