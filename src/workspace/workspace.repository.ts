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
    await this.knex('workspace_users').insert(data);
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
      .join('workspace_users', 'workspace.id', 'workspace_users.workspaceId')
      .where('workspace_users.userEmail', email)
      .select('workspace.*');
  }

  async getUsers(id: number): Promise<any> {
    return await this.knex
      .table('workspace_users')
      .join('user', 'workspace_users.userEmail', 'user.email')
      .where('workspace_users.workspaceId', id)
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
      .table('workspace_users')
      .del()
      .where('userEmail', email)
      .andWhere('workspaceId', id);
  }
}
