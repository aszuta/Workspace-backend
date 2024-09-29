import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PostRepository],
  controllers: [PostController],
})
export class PostModule {}
