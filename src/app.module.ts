import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { KnexModule } from 'nestjs-knex';
import Config from './config';

@Module({
  imports: [
    KnexModule.forRoot({
      config: Config.database,
    }),
    UserModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
