import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix(Config.apiPrefix);
  await app.listen(Config.port, Config.host, () => {
    console.log(`App is listening on port ${Config.port}`);
  });
}
bootstrap();
