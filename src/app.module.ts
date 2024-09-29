import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { KnexModule } from 'nestjs-knex';
import { PostModule } from './post/post.module';
import { WorkspaceModule } from './workspace/workspace.module';
import Config from './config';

@Module({
  imports: [
    KnexModule.forRoot({
      config: Config.database,
    }),
    UserModule,
    PostModule,
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
