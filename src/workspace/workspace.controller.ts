import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceDto } from './dto/create-workspace.dto';
import { UserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.interface';
import { Workspace } from './workspace.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  async findWorkspace(@Param('name') name: string): Promise<Workspace> {
    return await this.workspaceService.findWorkspace(name);
  }

  @Get('user/:email')
  async findWorkspaces(@Param('email') email: string): Promise<Workspace[]> {
    return await this.workspaceService.findWorkspaces(email);
  }

  @Get('users/:id')
  async findUsers(@Param('id', ParseIntPipe) id): Promise<User[]> {
    return await this.workspaceService.findUsers(id);
  }

  @Patch(':id')
  async uploadWorkspace(
    @Param('id', ParseIntPipe) id,
    @Body() workspaceDto: WorkspaceDto,
  ): Promise<void> {
    await this.workspaceService.updateWorkspace(id, workspaceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteWorkspace(@Req() req, @Param('id', ParseIntPipe) id): Promise<void> {
    return this.workspaceService.deleteWorkspace(id, req.user.id);
  }

  @Delete(':id/:email')
  removeUser(
    @Param('id', ParseIntPipe) id,
    @Param('email') email: string,
  ): Promise<void> {
    return this.workspaceService.removeUser(email, id);
  }
}
