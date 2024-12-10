import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from './workspace.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly userService: UserService,
  ) {}

  async createWorkspace(workspaceDto: WorkspaceDto): Promise<void> {
    const result = await this.workspaceRepository.create(workspaceDto);
    const data = {
      workspaceId: result[0],
      userId: workspaceDto.owner,
    };
    await this.workspaceRepository.assingToWorkspace(data);
  }

  async assignToWorkspace(workspaceId: string, email: string): Promise<void> {
    const user = await this.userService.findOne(email);
    const data = {
      workspaceId: workspaceId,
      userId: user.id,
    };
    await this.workspaceRepository.assingToWorkspace(data);
  }

  async getWorkspace(name: string): Promise<Workspace[]> {
    return await this.workspaceRepository.getOne(name);
  }

  async getWorkspaces(email: string): Promise<Workspace[]> {
    const user = await this.userService.findOne(email);
    return await this.workspaceRepository.getAll(user.id);
  }

  async getUser(workspaceId: number, userId: number): Promise<boolean> {
    return await this.workspaceRepository.getUser(workspaceId, userId);
  }

  async getUsers(id: number): Promise<any> {
    return await this.workspaceRepository.getUsers(id);
  }

  async updateWorkspace(id: number, data: object): Promise<void> {
    await this.workspaceRepository.update(id, data);
  }

  async removeWorkspace(id: number): Promise<void> {
    await this.workspaceRepository.remove(id);
  }

  async removeUser(email: string, id: number): Promise<void> {
    const user = await this.userService.findOne(email);
    await this.workspaceRepository.removeUser(user.id, id);
  }
}
