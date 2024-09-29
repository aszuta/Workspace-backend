import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Workspace } from './workspace.interface';

@Injectable()
export class WorkspaceRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: object): Promise<void> {
    await this.knex.table<Workspace>('workspace').insert(data);
  }

  async getAll(): Promise<Workspace[]> {
    return await this.knex.table('workspace');
  }

  async update(id: number, data: object): Promise<void> {
    await this.knex
      .table<Workspace>('workspace')
      .update(data)
      .where('owner', id);
  }

  async remove(id: number): Promise<void> {
    await this.knex.table('workspace').del().where('owner', id);
  }
}
