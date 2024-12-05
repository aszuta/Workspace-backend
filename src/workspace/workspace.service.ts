import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceDto } from './dto/workspace.dto';
import { Workspace } from './workspace.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly userService: UserService,
  ) {}

  async createWorkspace(workspaceDto: WorkspaceDto): Promise<void> {
    const { email, ...rest } = workspaceDto;
    const result = await this.workspaceRepository.create(rest);
    const data = {
      workspaceId: result,
      userEmail: email,
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
    return await this.workspaceRepository.getAll(email);
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
    await this.workspaceRepository.removeUser(email, id);
  }
}
