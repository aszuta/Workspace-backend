import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspaceRepository } from './workspace.repository';

@Module({
  providers: [WorkspaceService, WorkspaceRepository],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
