import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from 'src/comments/comments.module';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import TweetSchema, { Tweet } from './tweets.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
	imports: [MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]), CommentsModule],
	controllers: [TweetsController],
	providers: [
		TweetsService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [TweetsService],
})
export class TweetsModule {}
