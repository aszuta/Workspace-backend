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
import { WorkspaceDto } from './dto/create-workspace.dto';
import { UserDto } from 'src/user/dto/create-user.dto';

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
  async findWorkspace(
    @Param('name') name: string,
  ): Promise<Record<string, any>> {
    return await this.workspaceService.findWorkspace(name);
  }

  @Get('user/:email')
  async findWorkspaces(
    @Param('email') email: string,
  ): Promise<Record<string, any>> {
    return await this.workspaceService.findWorkspaces(email);
  }

  @Get('users/:id')
  async findUsers(@Param('id', ParseIntPipe) id): Promise<Record<string, any>> {
    return await this.workspaceService.findUsers(id);
  }

  @Patch(':id')
  async uploadWorkspace(
    @Param('id', ParseIntPipe) id,
    @Body() workspaceDto: WorkspaceDto,
  ): Promise<void> {
    await this.workspaceService.updateWorkspace(id, workspaceDto);
  }

  @Delete(':id')
  deleteWorkspace(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.workspaceService.deleteWorkspace(id);
  }

  @Delete(':id/:email')
  removeUser(
    @Param('id', ParseIntPipe) id,
    @Param('email') email: string,
  ): Promise<void> {
    return this.workspaceService.removeUser(email, id);
  }
}
