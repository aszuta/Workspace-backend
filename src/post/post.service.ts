import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostDto } from './dto/create-post.dto';
import { Post } from './post.interface';
import { UserService } from 'src/user/user.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { User } from 'src/user/user.interface';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async createPost(
    postDto: PostDto,
    userId: number,
    file?: any,
  ): Promise<void> {
    let path: string | undefined;

    const isUser = await this.workspaceService.findUser(
      postDto.workspaceId,
      userId,
    );

    if (!isUser) throw new NotFoundException();

    const postData = {
      title: postDto.title,
      description: postDto.description,
      createdBy: postDto.createdBy,
      workspaceId: postDto.workspaceId,
    };

    const postId = await this.postRepository.create(postData);
    const assingData = {
      postId: postId,
      userId: userId,
    };

    await this.postRepository.assignToPost(assingData);

    if (file) {
      path = file.path.replace(/\\/g, '/');
      const fileData = {
        filename: file.filename,
        filepath: path,
        mimetype: file.mimetype,
        postId: postId,
      };

      await this.postRepository.addPicture(fileData);
    }
  }

  async assignToPost(
    userId: number,
    postId: number,
    email: string,
  ): Promise<void> {
    const isUser = await this.postRepository.findUser(userId, postId);

    if (isUser.id !== userId) throw new NotFoundException();

    const user = await this.userService.findOne(email);
    const data = {
      postId: postId,
      userId: user.id,
    };

    await this.postRepository.assignToPost(data);
  }

  async findPosts(email: string, id: number): Promise<Post[]> {
    const user = await this.userService.findOne(email);
    const posts = await this.postRepository.findByUser(user.id, id);
    posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return posts;
  }

  async findUsers(id: number): Promise<User[]> {
    return await this.postRepository.findUsers(id);
  }

  async updatePost(
    userId: number,
    id: number,
    postDto: PostDto,
  ): Promise<void> {
    const isUser = await this.workspaceService.findUser(
      postDto.workspaceId,
      userId,
    );

    if (!isUser) throw new NotFoundException();

    await this.postRepository.update(id, postDto);
  }

  async deletePost(id: number, userId: number): Promise<void> {
    const post = await this.postRepository.findPost(id, userId);
    if (post) await this.postRepository.delete(id);
  }

  async removeUser(email: string, id: number): Promise<void> {
    const user = await this.userService.findOne(email);
    await this.postRepository.removeUser(user.id, id);
  }
}
