import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Workspace } from './workspace.interface';

@Injectable()
export class WorkspaceRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: object): Promise<any> {
    return await this.knex.table<Workspace>('workspace').insert(data);
  }

  async assingToWorkspace(data: object): Promise<void> {
    await this.knex('workspace_members').insert(data);
  }

  async getOne(name: string): Promise<Workspace[]> {
    return await this.knex
      .table<Workspace>('workspace')
      .where('title', name)
      .first();
  }

  async getAll(email: string): Promise<any> {
    return await this.knex
      .table('workspace')
      .join(
        'workspace_members',
        'workspace.id',
        'workspace_members.workspace_id',
      )
      .where('workspace_members.user_email', email)
      .select('workspace.*');
  }

  async getUsers(id: number): Promise<any> {
    return await this.knex
      .table('workspace_members')
      .join('user', 'workspace_members.user_email', 'user.email')
      .where('workspace_members.workspace_id', id)
      .select('id', 'name', 'email')
      .distinct();
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

  async removeUser(email: string, id: number): Promise<void> {
    await this.knex
      .table('workspace_members')
      .del()
      .where('user_email', email)
      .andWhere('workspace_id', id);
  }
}
