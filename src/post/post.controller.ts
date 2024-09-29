import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() postDto: PostDto): Promise<void> {
    await this.postService.createPost(postDto);
  }

  @Get(':id')
  async getPosts(@Param('id', ParseIntPipe) id): Promise<Record<string, any>> {
    return await this.postService.getPosts(id);
  }

  @Patch(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id,
    @Body() postDto: PostDto,
  ): Promise<void> {
    await this.postService.updatePost(id, postDto);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.postService.deletePost(id);
  }
}
