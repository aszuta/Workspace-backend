import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspaceRepository } from './workspace.repository';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [WorkspaceService, WorkspaceRepository, UserRepository],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
