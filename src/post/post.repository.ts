import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Post } from './post.interface';

@Injectable()
export class PostRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: object): Promise<any> {
    return await this.knex.table<Post>('post').insert(data);
  }

  async assignToPost(data: object): Promise<void> {
    await this.knex('post_users').insert(data);
  }

  async addPicture(data: object): Promise<void> {
    await this.knex.table('post_picture').insert(data);
  }

  async get(email: string, id: number): Promise<Post[]> {
    return await this.knex
      .table('post')
      .join('post_users', 'post.id', 'post_users.postId')
      .join('user', 'post_users.userEmail', 'user.email')
      .where('post_users.userEmail', email)
      .andWhere('post.workspaceId', id)
      .select('post.*', 'post_users.*', 'user.name');
  }

  async getUsers(id: number): Promise<any> {
    return await this.knex
      .table('post_users')
      .join('user', 'post_users.userEmail', 'user.email')
      .where('post_users.postId', id)
      .select('id', 'name', 'email')
      .distinct();
  }

  async update(id: number, data: object): Promise<void> {
    await this.knex.table<Post>('table').update(data).where('id', id);
  }

  async delete(id: number): Promise<void> {
    await this.knex.table<Post>('post').del().where('id', id);
  }

  async removeUser(email: string, id: number): Promise<void> {
    await this.knex
      .table('post_users')
      .del()
      .where('userEmail', email)
      .andWhere('postId', id);
  }
}
