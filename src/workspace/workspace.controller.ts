import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceDto } from './dto/workspace.dto';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async createWorkspace(@Body() workspaceDto: WorkspaceDto): Promise<void> {
    await this.workspaceService.createWorkspace(workspaceDto);
  }

  @Post(':workspaceId/assign')
  async assignUserToWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Body() userDto: UserDto,
  ): Promise<void> {
    await this.workspaceService.assignToWorkspace(workspaceId, userDto.email);
  }

  @Get(':name')
  async getWorkspace(
    @Param('name') name: string,
  ): Promise<Record<string, any>> {
    return await this.workspaceService.getWorkspace(name);
  }

  @Get('user/:email')
  async getWorkspaces(
    @Param('email') email: string,
  ): Promise<Record<string, any>> {
    return await this.workspaceService.getWorkspaces(email);
  }

  @Get('users/:id')
  async getUsers(@Param('id', ParseIntPipe) id): Promise<Record<string, any>> {
    return await this.workspaceService.getUsers(id);
  }

  @Patch(':id')
  async uploadWorkspace(
    @Param('id', ParseIntPipe) id,
    @Body() workspaceDto: WorkspaceDto,
  ): Promise<void> {
    await this.workspaceService.updateWorkspace(id, workspaceDto);
  }

  @Delete(':id')
  removeWorkspace(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.workspaceService.removeWorkspace(id);
  }

  @Delete(':id/:email')
  removeUser(
    @Param('id', ParseIntPipe) id,
    @Param('email') email: string,
  ): Promise<void> {
    return this.workspaceService.removeUser(email, id);
  }
}
