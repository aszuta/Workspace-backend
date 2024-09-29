import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceDto } from './dto/workspace.dto';
import { Workspace } from './workspace.interface';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async createWorkspace(workspaceDto: WorkspaceDto): Promise<void> {
    await this.workspaceRepository.create(workspaceDto);
  }

  async getWorkspaces(): Promise<Workspace[]> {
    return await this.workspaceRepository.getAll();
  }

  async updateWorkspace(id: number, data: object): Promise<void> {
    await this.workspaceRepository.update(id, data);
  }

  async removeWorkspace(id: number): Promise<void> {
    await this.workspaceRepository.remove(id);
  }
}
