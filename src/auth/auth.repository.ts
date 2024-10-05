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
}
