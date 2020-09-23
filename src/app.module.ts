import { Module, HttpModule } from '@nestjs/common';
import { AppController} from './controllers/app.controller';
import { GoogleController} from './controllers/google.controller';
import { NewsController} from './controllers/news.controller';
import { PreviewController} from './controllers/preview.controller';
import { ChannelController} from './controllers/channel.controller';
import { UserController} from './controllers/user.controller';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { NewsService } from './services/news.service';
import { PreviewService } from './services/preview.service';
import { ChannelService } from './services/channel.service';
import { UserService } from './services/user.service';
import { GoogleStrategy } from './strategies/google.strategy'
import { PassportModule } from '@nestjs/passport';
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
  ],
  controllers: [AppController, GoogleController, NewsController, PreviewController, UserController, ChannelController],
  providers: [AuthService, AppService, CacheService, NewsService, PreviewService, UserService, ChannelService, GoogleStrategy],
})
export class AppModule {}
