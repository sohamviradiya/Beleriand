import { Controller, Get, Post, Delete, Put, Body, Param, UseInterceptors, UploadedFile, MaxFileSizeValidator, ParseFilePipe, PayloadTooLargeException, Req, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import InitUserDto from './users.dto';
import { Tweet } from 'src/tweets/tweets.schema';
import { Comment } from 'src/comments/comments.schema';
import { TweetsService } from 'src/tweets/tweets.service';
import { CommentsService } from 'src/comments/comments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/auth/auth.constants';
import { randomUUID } from 'crypto';

const UploadConfigs = FileInterceptor('avatar', {
	fileFilter(req, file, callback) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			return callback(new Error('Only image files are allowed!'), false);
		}
		return callback(null, true);
	},
	storage: diskStorage({
		destination: './uploads',
		filename: (req, file, callback) => {
			const extension: string = file.originalname.split('.')[1];
			callback(null, `${randomUUID()}.${extension}`);
		},
	}),
});

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService, private readonly tweetService: TweetsService, private readonly commentService: CommentsService) {}

	@Public()
	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Public()
	@Get(':id')
	findOne(@Param('id') id): Promise<User> {
		return this.userService.findOne(id);
	}

	@Public()
	@Get(':id/tweets')
	findTweets(@Param('id') id): Promise<Tweet[]> {
		return this.tweetService.findAllByUserId(id);
	}

	@Public()
	@Get(':id/comments')
	findComments(@Param('id') id): Promise<Comment[]> {
		return this.commentService.findAllByUserId(id);
	}

	@Public()
	@Get(':id/followers')
	findFollowersByUserId(@Param('id') id): Promise<User[]> {
		return this.userService.findFollowers(id);
	}

	@Public()
	@Get(':id/liked')
	findLikedTweets(@Param('id') id): Promise<Tweet[]> {
		return this.tweetService.findAllLikedByUserId(id);
	}

	@Public()
	@Post()
	@UseInterceptors(UploadConfigs)
	create(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 })],
			}),
		)
		file: Express.Multer.File,
		@Body() user: InitUserDto,
	): Promise<User> {
		return this.userService.create({ ...user, avatar: file.path });
	}

	@Post(':id/follow')
	follow(@Req() req, @Param('id') followId: string): Promise<User> {
		return this.userService.follow(req.user._id, followId);
	}

	@Delete()
	remove(@Req() req): Promise<any> {
		this.tweetService.removeAllByUserId(req.user._id);
		this.commentService.removeAllByUserId(req.user._id);
		return this.userService.remove(req.user._id);
	}

	@Delete(':id/follow')
	unfollow(@Req() req, @Param('id') followId: string): Promise<User> {
		return this.userService.unfollow(req.user._id, followId);
	}
	
	@Put()
	@UseInterceptors(UploadConfigs)
	update(
		@Req() req,
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 })],
			}),
		)
		file: Express.Multer.File,
		@Body() user: InitUserDto,
	): Promise<User> {
		return this.userService.update(req.user._id, { ...user, avatar: file.path });
	}
}
