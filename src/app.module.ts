import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { KnexModule } from 'nestjs-knex';
import { PostModule } from './post/post.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    WorkspaceModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
