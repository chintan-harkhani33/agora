import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgoraapiModule } from './agoraapi/agoraapi.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AgoraapiModule, ConfigModule.forRoot() ,HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
