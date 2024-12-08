import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { User } from './user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: object): Promise<void> {
    return await this.knex<User>('user').insert(data);
  }

  findOne(email: string): Promise<User> {
    return this.knex<User>('user').where('email', email).first();
  }

  findByEmail(email: string): Promise<Record<string, any>> {
    return this.knex('user')
      .select('id', 'name', 'email')
      .where('email', email)
      .first();
  }

  findById(id: number): Promise<Record<string, any>> {
    return this.knex('user').where('id', id).first();
  }
}
