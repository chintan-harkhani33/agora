import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RtcTokenBuilder, RtcRole } from 'agora-token';
import { log } from 'console';
// import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AgoraapiService {
  constructor(private httpService: HttpService) {}
  private readonly logger = new Logger(AgoraapiService.name);
  async AgoraToken(channelName: string): Promise<any> {
    try {
    let max = 4294967295; 
    let uid = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    const ExpireTime = parseInt(process.env.TOKEN_EXPIRE_TIME, 10);
    console.log({ExpireTime});

    const CurrentTIme = Math.floor(Date.now() / 1000);
    const PriExpireTime = CurrentTIme + ExpireTime;
    console.log({PriExpireTime});

    console.log("process.env.AGORA_APPID", process.env.AGORA_APPID)
    console.log("process.env.AGORA_APP_CERTIFICATE", process.env.AGORA_APP_CERTIFICATE)


    let privilege_expire = 3600;
    const Token = RtcTokenBuilder.buildTokenWithUid(
      process.env.AGORA_APPID,
      process.env.AGORA_APP_CERTIFICATE,
      channelName,
      uid,
      RtcRole.PUBLISHER,
      PriExpireTime,
      privilege_expire,
    );
console.log("Token", Token);

      return {
        data: {
          channelName,
          uid,
          Token,
        },
        statuseCode: HttpStatus.OK,
        message: 'Token Create SuccessFully..',
      };

    } catch (error) {
      console.error('Error calling Agora API:', error);
      return Promise.reject(error);
    }
  }

 
  // private readonly AGORA_API_BASE_URL = 'https://api.agora.io/v1/apps';
  // private readonly AGORA_APP_ID = process.env.AGORA_APPID;
  // private readonly CUSTOMER_ID = process.env.CUSTOMER_ID;
  // private readonly CUSTOMER_CERTIFICATE = process.env.CUSTOMER_CERTIFICATE;

  // private get authorizationHeader(): string {
  //   return Buffer.from(
  //     `${this.CUSTOMER_ID}:${this.CUSTOMER_CERTIFICATE}`,
  //   ).toString('base64');
  // }
  

  // async recordingStart(channel: string, uid: string, token: string) {
  //   try {
    
  //     console.time('Checking acquireResource');
  //     const resourceId = await this.acquireResource(channel, uid);
  //     const startUrl = `${this.AGORA_API_BASE_URL}/${this.AGORA_APP_ID}/cloud_recording/resourceid/${resourceId}/mode/individual/start`;
  //     const data = {
  //       cname: channel,
  //       uid: uid,
  //       clientRequest: {
  //         token,
  //         recordingConfig: {
  //           maxIdleTime: 10,
  //           channelType: 1,
  //           streamTypes: 2,
  //           streamMode: 'default',
  //           videoStreamType: 0,
  //           // subscribeVideoUids: ["1"],
  //         // subscribeAudioUids: ["1"],
  //         subscribeUidGroup: 0,
         
  //           // subscribeUidGroup:1,
  //         //   transcodingConfig: {
  //         //     width: 360,
  //         //     height: 640,
  //         //     bitrate: 500,
  //         //     fps: 15
  //         //     mixedVideoLayout: 1,
  //         // }
  //         },
  //         recordingFileConfig: {
  //           avFileType: ["hls"],
  //         },
  //         storageConfig: {
  //           vendor: 1,
  //           region: 0,
  //           bucket: process.env.AWS_BUCKET,
  //           accessKey:  process.env.AWS_ACCESSKEY_ID,
  //           secretKey:process.env.AWS_SECRET_KEY,
  //           fileNamePrefix: ['demorecording2'],
  //         },
  //       },
  //     };
  //     const datas = await firstValueFrom(this.httpService
  //       .post(startUrl, data, {
  //         headers: {
  //           Authorization: `Basic ${this.authorizationHeader}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }));
  //     // console.log('Response', data);
  //     console.timeEnd('Checking acquireResource');
  //     // return startsResponse.data;
  //     // console.log('data', data);
      
  //     return datas.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async acquireResource(channel: string, uid: string): Promise<any> {
  //   try {
  //     const acquireResponse = await firstValueFrom(this.httpService
  //       .post(
  //         `${this.AGORA_API_BASE_URL}/${this.AGORA_APP_ID}/cloud_recording/acquire`,
  //         {
  //           cname: channel,
  //           uid: uid,
  //           clientRequest: {
  //             resourceExpiredHour: 24,
  //           },
  //         },
  //         {
  //           headers: {
  //             Authorization: `Basic ${this.authorizationHeader}`,
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       ))
  //     const resourceId = acquireResponse.data.resourceId;
  //     console.log(resourceId);
  //     this.logger.log(`Resource ID acquired: ${resourceId}`);
  //     return resourceId;
  //   } catch (error) {
  //     console.error('Error querying recording status:', error);
  //     throw error;
  //   }
  // }

}
