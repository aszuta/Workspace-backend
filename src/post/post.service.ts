import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostDto } from './dto/post.dto';
import { Post } from './post.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(postDto: PostDto): Promise<void> {
    await this.postRepository.create(postDto);
  }

  async getPosts(id: number): Promise<Post[]> {
    return await this.postRepository.get(id);
  }

  async updatePost(id: number, data: object): Promise<void> {
    await this.postRepository.update(id, data);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
