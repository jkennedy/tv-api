import { Module, HttpModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController} from './controllers/app.controller';
import { GoogleController} from './controllers/google.controller';
import { NewsController} from './controllers/news.controller';
import { EventController} from './controllers/event.controller';
import { ComedyController} from './controllers/comedy.controller';
import { DeviceController} from './controllers/device.controller';
import { WeatherController} from './controllers/weather.controller';
import { PreviewController} from './controllers/preview.controller';
import { ChannelController} from './controllers/channel.controller';
import { UserController} from './controllers/user.controller';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { NewsService } from './services/news.service';
import { EventService } from './services/event.service';
import { DeviceService } from './services/device.service';
import { WeatherService } from './services/weather.service';
import { PreviewService } from './services/preview.service';
import { ChannelService } from './services/channel.service';
import { ComedyService } from './services/comedy.service';
import { UserService } from './services/user.service';
import { UserProcessor } from './processors/user.processor';
import { PassportModule } from '@nestjs/passport';
import { FireBaseStrategy } from './strategies/firebase.strategy';

import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from 'nestjs-config';

import * as admin from 'firebase-admin'
import * as path from 'path';

@Module({
  imports:[
    HttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.applicationDefault()
      })
    }),
    BullModule.registerQueue({
      name: 'mychannel',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    })
  ],
  controllers: [AppController, GoogleController, NewsController, EventController, DeviceController, WeatherController, PreviewController, UserController, ChannelController, ComedyController],
  providers: [AuthService, AppService, CacheService, NewsService, EventService, DeviceService, WeatherService, PreviewService, UserService, ComedyService, UserProcessor, ChannelService, FireBaseStrategy],
})
export class AppModule {}
