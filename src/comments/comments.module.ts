import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [],
  controllers: [AppController, CommentsController],
  providers: [AppService, CommentsService],
})
export class AppModule {}
