import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import CommentSchema, { Comment } from './comments.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
	imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
	controllers: [CommentsController],
	providers: [
		CommentsService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [CommentsService],
})
export class CommentsModule {}
