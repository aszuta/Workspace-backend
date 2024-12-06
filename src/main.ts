import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const apiPrefix = config.get('apiPrefix');
  const port = config.get('port');
  const host = config.get('host');
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix(apiPrefix);
  await app.listen(port, host, () => {
    console.log(`App is listening on port ${port}`);
  });
}
bootstrap();
