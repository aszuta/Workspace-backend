import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multerOptions';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() postDto: PostDto,
  ): Promise<void> {
    await this.postService.createPost(postDto, file);
  }

  @Post(':postId/assign')
  async assignUserToPost(
    @Param('postId') postId: number,
    @Body() UserDto: UserDto,
  ): Promise<void> {
    await this.postService.assignToPost(postId, UserDto.email);
  }

  @Get(':id/:email')
  async getPosts(
    @Param('id', ParseIntPipe) id,
    @Param('email') email: string,
  ): Promise<Record<string, any>> {
    return await this.postService.getPosts(email, id);
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
