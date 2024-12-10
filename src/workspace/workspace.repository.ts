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

  async getAll(userId: number): Promise<any> {
    return await this.knex
      .table('workspace')
      .join('workspace_users', 'workspace.id', 'workspace_users.workspaceId')
      .where('workspace_users.userId', userId)
      .select('workspace.*');
  }

  async getUser(workspaceId: number, userId: number): Promise<boolean> {
    const result = await this.knex
      .table('workspace_users')
      .where('workspaceId', workspaceId)
      .andWhere('userId', userId);
    return !!result;
  }

  async getUsers(id: number): Promise<any> {
    return await this.knex
      .table('workspace_users')
      .join('user', 'workspace_users.userId', 'user.id')
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

  async removeUser(userId: number, id: number): Promise<void> {
    await this.knex
      .table('workspace_users')
      .del()
      .where('userId', userId)
      .andWhere('workspaceId', id);
  }
}
