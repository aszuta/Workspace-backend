import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Post } from './post.interface';
import { User } from 'src/user/user.interface';

@Injectable()
export class PostRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: object): Promise<void> {
    return await this.knex.table<Post>('post').insert(data);
  }

  async assignToPost(data: object): Promise<void> {
    await this.knex('post_users').insert(data);
  }

  async addPicture(data: object): Promise<void> {
    await this.knex.table('post_picture').insert(data);
  }

  async findByUser(userId: number, id: number): Promise<Post[]> {
    return this.knex
      .table('post')
      .join('post_users', 'post.id', 'post_users.postId')
      .join('user', 'post_users.userId', 'user.id')
      .where('post_users.userId', userId)
      .andWhere('post.workspaceId', id)
      .select('post.*', 'post_users.*', 'user.name');
  }

  async findPost(id: number, userId: number): Promise<boolean> {
    const result = this.knex
      .table<Post>('post')
      .where('id', id)
      .andWhere('createdBy', userId)
      .first();
    return !!result;
  }

  async findUser(userId: number, postId: number): Promise<User> {
    return this.knex
      .table('post_users')
      .join('user', 'post_users.userId', 'user.id')
      .where('post_users.postId', postId)
      .andWhere('post_users.userId', userId)
      .select('id', 'name', 'email')
      .first();
  }

  async findUsers(id: number): Promise<User[]> {
    return this.knex
      .table('post_users')
      .join('user', 'post_users.userId', 'user.id')
      .where('post_users.postId', id)
      .select('id', 'name', 'email')
      .distinct();
  }

  async update(id: number, data: object): Promise<void> {
    await this.knex.table<Post>('post').update(data).where('id', id);
  }

  async delete(id: number): Promise<void> {
    await this.knex.table<Post>('post').del().where('id', id);
  }

  async removeUser(userId: number, id: number): Promise<void> {
    await this.knex
      .table('post_users')
      .del()
      .where('userId', userId)
      .andWhere('postId', id);
  }
}
