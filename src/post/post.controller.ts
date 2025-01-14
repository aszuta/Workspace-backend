import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/post/create-post-multer-options';
import { UserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.interface';
import { PostWithPicture } from './post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Body() postDto: PostDto,
  ): Promise<void> {
    await this.postService.createPost(postDto, req.user.id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/assign')
  async assignUserToPost(
    @Req() req,
    @Param('postId') postId: number,
    @Body() userDto: UserDto,
  ): Promise<void> {
    await this.postService.assignToPost(req.user.id, postId, userDto.email);
  }

  @Get(':id/:email')
  async findPosts(
    @Param('id', ParseIntPipe) id,
    @Param('email') email: string,
  ): Promise<PostWithPicture[]> {
    return await this.postService.findPosts(email, id);
  }

  @Get(':id')
  async findUsers(@Param('id', ParseIntPipe) id): Promise<User[]> {
    return await this.postService.findUsers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  async updatePost(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Param('id', ParseIntPipe) id,
    @Body() postDto: PostDto,
  ): Promise<void> {
    await this.postService.updatePost(req.user.id, id, postDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Req() req, @Param('id', ParseIntPipe) id): Promise<void> {
    return this.postService.deletePost(id, req.user);
  }

  @Delete(':id/:email')
  removeUser(
    @Param('id', ParseIntPipe) id,
    @Param('email') email: string,
  ): Promise<void> {
    return this.postService.removeUser(email, id);
  }
}
