import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { User } from 'src/user/user.interface';

@Injectable()
export class AuthRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async setRefreshToken(refreshToken: string, id: number): Promise<void> {
    await this.knex
      .table<User>('user')
      .update({ refresh_token: refreshToken })
      .where('id', id);
  }

  findByRefreshToken(hash: string): Promise<Record<string, any>> {
    return this.knex('user')
      .select('id', 'name', 'email')
      .where('refresh_token', hash)
      .first();
  }

  async removeRefreshToken(id: number): Promise<void> {
    await this.knex('user').update({ refresh_token: null }).where('id', id);
  }
}
