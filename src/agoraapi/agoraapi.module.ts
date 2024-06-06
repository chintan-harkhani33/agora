import { Module } from '@nestjs/common';
import { AgoraapiService } from './agoraapi.service';
import { AgoraapiController } from './agoraapi.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports :[HttpModule],
  controllers: [AgoraapiController],
  providers: [AgoraapiService],
})
export class AgoraapiModule {}
