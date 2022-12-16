import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [],
  controllers: [AppController, TweetsController],
  providers: [AppService, TweetsService],
})
export class AppModule {}
