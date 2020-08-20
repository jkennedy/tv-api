import { Module, HttpModule } from '@nestjs/common';
import { AppController} from './controllers/app.controller';
import { GoogleController} from './controllers/google.controller';
import { NewsController} from './controllers/news.controller';
import { PreviewController} from './controllers/preview.controller';
import { UserController} from './controllers/user.controller';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { NewsService } from './services/news.service';
import { PreviewService } from './services/preview.service';
import { UserService } from './services/user.service';
import { GoogleStrategy } from './strategies/google.strategy'
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[HttpModule, InMemoryDBModule.forRoot({})],
  controllers: [AppController, GoogleController, NewsController, PreviewController, UserController],
  providers: [AuthService, AppService, CacheService, NewsService, PreviewService, UserService, GoogleStrategy],
})
export class AppModule {}
