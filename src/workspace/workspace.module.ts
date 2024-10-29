import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspaceRepository } from './workspace.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  providers: [WorkspaceService, WorkspaceRepository, UserRepository],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
