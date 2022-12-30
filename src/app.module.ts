import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
			serveRoot: '/uploads',
		}),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UsersModule,
		TweetsModule,
		CommentsModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
