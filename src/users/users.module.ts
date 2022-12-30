import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from 'src/comments/comments.module';
import { TweetsModule } from 'src/tweets/tweets.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import UserSchema, { User } from './users.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
	imports: [CommentsModule, TweetsModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [UsersController],
	providers: [
		UsersService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [UsersService],
})
export class UsersModule {}
