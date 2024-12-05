import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { User } from 'src/user/user.interface';

@Injectable()
export class AuthRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async setRefreshToken(refreshToken: string, id: number): Promise<void> {
    await this.knex
      .table<User>('user')
      .update({ refreshToken: refreshToken })
      .where('id', id);
  }

  findByRefreshToken(hash: string): Promise<Record<string, any>> {
    return this.knex('user')
      .select('id', 'name', 'email')
      .where('refreshToken', hash)
      .first();
  }

  async removeRefreshToken(id: number): Promise<void> {
    await this.knex('user').update({ refreshToken: null }).where('id', id);
  }
}
