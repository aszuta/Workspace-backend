import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class AuthRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(id: number, password: string): Promise<void> {
    await this.knex
      .table('auth_credentials')
      .insert({ id: id, password: password });
  }

  async setRefreshToken(refreshToken: string, id: number): Promise<void> {
    await this.knex
      .table('auth_credentials')
      .update({ refreshToken: refreshToken })
      .where('id', id);
  }

  findById(id: number): Promise<Record<string, any>> {
    return this.knex('auth_credentials')
      .select('password')
      .where('id', id)
      .first();
  }

  findByRefreshToken(hash: string): Promise<Record<string, any>> {
    return this.knex('auth_credentials')
      .select('id')
      .where('refreshToken', hash)
      .first();
  }

  async removeRefreshToken(id: number): Promise<void> {
    await this.knex('auth_credentials')
      .update({ refreshToken: null })
      .where('id', id);
  }
}
