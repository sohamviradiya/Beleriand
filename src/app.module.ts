import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TweetsController } from './tweets/tweets.controller';
import { CommentsController } from './comments/comments.controller';
import { UsersService } from './users/users.service';
import { TweetsService } from './tweets/tweets.service';
import { CommentsService } from './comments/comments.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })],
	controllers: [AppController, UsersController, TweetsController, CommentsController],
	providers: [AppService, UsersService, TweetsService, CommentsService],
})
export class AppModule {}
