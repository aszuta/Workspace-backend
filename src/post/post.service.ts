import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostDto } from './dto/post.dto';
import { Post } from './post.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(postDto: PostDto, file?: any): Promise<void> {
    let path: string | undefined;

    const postData = {
      title: postDto.title,
      description: postDto.description,
      createdBy: postDto.createdBy,
      workspace_id: postDto.workspace_id,
    };

    const postId = await this.postRepository.create(postData);
    const assingData = {
      post_id: postId,
      user_email: postDto.email,
    };

    await this.postRepository.assignToPost(assingData);

    if (file) {
      path = file.path.replace(/\\/g, '/');
      const fileData = {
        filename: file.filename,
        filepath: path,
        mimetype: file.mimetype,
        post_id: postId,
      };

      await this.postRepository.addPicture(fileData);
    }
  }

  async assignToPost(postId: number, email: string): Promise<void> {
    const data = {
      post_id: postId,
      user_email: email,
    };
    await this.postRepository.assignToPost(data);
  }

  async getPosts(email: string, id: number): Promise<Post[]> {
    return await this.postRepository.get(email, id);
  }

  async updatePost(id: number, data: object): Promise<void> {
    await this.postRepository.update(id, data);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
