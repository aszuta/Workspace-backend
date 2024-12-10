import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { WorkspaceModule } from 'src/workspace/workspace.module';

@Module({
  imports: [UserModule, WorkspaceModule],
  providers: [PostService, PostRepository, UserRepository, JwtService],
  controllers: [PostController],
})
export class PostModule {}
