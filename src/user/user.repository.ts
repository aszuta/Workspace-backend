import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { User } from './user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: object): Promise<void> {
    await this.knex<User>('user').insert(data);
  }

  findOne(email: string): Promise<User> {
    return this.knex<User>('user').where('email', email).first();
  }
}
