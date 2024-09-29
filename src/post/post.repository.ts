import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Post } from './post.interface';

@Injectable()
export class PostRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: object): Promise<void> {
    await this.knex.table<Post>('post').insert(data);
  }

  async get(id: number): Promise<Post[]> {
    return await this.knex.table<Post>('post').where('workId', id);
  }

  async update(id: number, data: object): Promise<void> {
    await this.knex.table<Post>('table').update(data).where('id', id);
  }

  async delete(id: number): Promise<void> {
    await this.knex.table<Post>('post').del().where('id', id);
  }
}
