import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix(Config.apiPrefix);
  await app.listen(Config.port, Config.host, () => {
    console.log(`App is listening on port ${Config.port}`);
  });
}
bootstrap();
