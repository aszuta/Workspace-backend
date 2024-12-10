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

  async findWorkspace(name: string): Promise<Workspace[]> {
    return await this.workspaceRepository.findOne(name);
  }

  async findWorkspaces(email: string): Promise<Workspace[]> {
    const user = await this.userService.findOne(email);
    return await this.workspaceRepository.findAll(user.id);
  }

  async findUser(workspaceId: number, userId: number): Promise<boolean> {
    return await this.workspaceRepository.findUser(workspaceId, userId);
  }

  async findUsers(id: number): Promise<any> {
    return await this.workspaceRepository.findUsers(id);
  }

  async updateWorkspace(id: number, data: object): Promise<void> {
    await this.workspaceRepository.update(id, data);
  }

  async deleteWorkspace(id: number): Promise<void> {
    await this.workspaceRepository.delete(id);
  }

  async removeUser(email: string, id: number): Promise<void> {
    const user = await this.userService.findOne(email);
    await this.workspaceRepository.removeUser(user.id, id);
  }
}
