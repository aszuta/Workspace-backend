import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { User } from './user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(user: User): Promise<void> {
    return await this.knex<User>('user').insert({
      name: user.name,
      email: user.email,
    });
  }

  findOne(email: string): Promise<User | null> {
    return this.knex<User>('user').where('email', email).first();
  }

  findByEmail(email: string): Promise<User> {
    return this.knex('user')
      .select('id', 'name', 'email')
      .where('email', email)
      .first();
  }

  findById(id: number): Promise<User> {
    return this.knex('user').where('id', id).first();
  }
}
