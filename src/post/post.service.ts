import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostDto } from './dto/post.dto';
import { Post } from './post.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
  ) {}

  async createPost(postDto: PostDto, file?: any): Promise<void> {
    let path: string | undefined;

    const postData = {
      title: postDto.title,
      description: postDto.description,
      createdBy: postDto.createdBy,
      workspaceId: postDto.workspaceId,
    };

    const postId = await this.postRepository.create(postData);
    const assingData = {
      postId: postId,
      userEmail: postDto.email,
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

  async assignToPost(postId: number, email: string): Promise<void> {
    const user = await this.userService.findOne(email);
    const data = {
      postId: postId,
      userId: user.id,
    };
    await this.postRepository.assignToPost(data);
  }

  async getPosts(email: string, id: number): Promise<Post[]> {
    return await this.postRepository.get(email, id);
  }

  async getUsers(id: number): Promise<any> {
    return await this.postRepository.getUsers(id);
  }

  async updatePost(id: number, data: object): Promise<void> {
    await this.postRepository.update(id, data);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async removeUser(email: string, id: number): Promise<void> {
    await this.postRepository.removeUser(email, id);
  }
}
