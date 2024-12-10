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
import { PostDto } from './dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/post/create-post-multer-options';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @Get(':id/:userId')
  async getPosts(
    @Param('id', ParseIntPipe) id,
    @Param('userId') userId: number,
  ): Promise<Record<string, any>> {
    return await this.postService.getPosts(userId, id);
  }

  @Get(':id')
  async getUsers(@Param('id', ParseIntPipe) id): Promise<Record<string, any>> {
    return await this.postService.getUsers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(
    @Req() req,
    @Param('id', ParseIntPipe) id,
    @Body() postDto: PostDto,
  ): Promise<void> {
    await this.postService.updatePost(req.user.id, id, postDto);
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
