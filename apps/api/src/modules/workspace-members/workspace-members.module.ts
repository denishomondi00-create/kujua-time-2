import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceMember, WorkspaceMemberSchema } from './schemas/workspace-member.schema';
import { WorkspaceMembersController } from './controllers/workspace-members.controller';
import { WorkspaceMembersService } from './services/workspace-members.service';
import { WorkspaceMembersRepository } from './repositories/workspace-members.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: WorkspaceMember.name, schema: WorkspaceMemberSchema }])],
  controllers: [WorkspaceMembersController],
  providers: [WorkspaceMembersService, WorkspaceMembersRepository],
  exports: [WorkspaceMembersService],
})
export class WorkspaceMembersModule {}
