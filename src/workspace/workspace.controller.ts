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

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async createWorkspace(@Body() workspaceDto: WorkspaceDto): Promise<void> {
    await this.workspaceService.createWorkspace(workspaceDto);
  }

  @Get()
  async getWorkspaces(): Promise<Record<string, any>> {
    return await this.workspaceService.getWorkspaces();
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
}
