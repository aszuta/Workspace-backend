import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [UserModule],
  providers: [PostService, PostRepository, UserRepository],
  controllers: [PostController],
})
export class PostModule {}
