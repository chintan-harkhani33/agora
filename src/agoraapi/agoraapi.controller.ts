import { BadRequestException, Body, Controller, Get,  HttpStatus,  Param,  Post,  Query } from '@nestjs/common';
import { AgoraapiService } from './agoraapi.service';

@Controller('agora')
export class AgoraapiController {
  constructor(private readonly agoraapiService: AgoraapiService) {}

 @Get('/agora-token')
 async AgoraToken(@Query('channelName') channelName :string ):Promise<any>{
  console.log(channelName)
  return await this.agoraapiService.AgoraToken(channelName )
 }
}