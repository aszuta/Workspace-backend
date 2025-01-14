import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { KnexModule } from 'nestjs-knex';
import { PostModule } from './post/post.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandshakeController } from './handshake/handshake.controller';
import { RegisterModule } from './register/register.module';
import configuration from './config/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
      serveRoot: '/public/',
    }),
    UserModule,
    PostModule,
    WorkspaceModule,
    AuthModule,
    RegisterModule,
  ],
  controllers: [HandshakeController],
  providers: [],
})
export class AppModule {}
