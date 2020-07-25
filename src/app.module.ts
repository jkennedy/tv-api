import { Module, HttpModule } from '@nestjs/common';
import { AppController} from './app.controller';
import { GoogleController} from './google.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy'
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [HttpModule, InMemoryDBModule.forRoot({})],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
