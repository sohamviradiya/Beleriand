import { Controller, Get, Post, Delete, Put, Body, Param, Req } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Tweet } from './tweets.schema';
import { Comment } from 'src/comments/comments.schema';
import { CommentsService } from 'src/comments/comments.service';
import InitTweetDto from './tweets.dto';
import { Public } from 'src/auth/auth.constants';

@Controller('tweets')
export class TweetsController {
	constructor(private readonly tweetService: TweetsService, private readonly commentService: CommentsService) {}

	@Public()
	@Get()
	findAll(): Promise<Tweet[]> {
		return this.tweetService.findAll();
	}

	@Public()
	@Get(':id')
	findOne(@Param('id') id): Promise<Tweet> {
		return this.tweetService.findOne(id);
	}

	@Public()
	@Get(':id/comments')
	findComments(@Param('id') id): Promise<Comment[]> {
		return this.commentService.findAllByTweetId(id);
	}

	@Post()
	create(@Body() tweet: InitTweetDto, @Req() req): Promise<Tweet> {
		return this.tweetService.create({ ...tweet }, req.user._id);
	}

	@Post(':id/like')
	like(@Param('id') id, @Req() req): Promise<Tweet> {
		return this.tweetService.like(id, req.user._id);
	}

	@Delete()
	removeAllByUserId(@Req() req): Promise<any> {
		this.tweetService.findAllByUserId(req.user._id).then((tweets) => {
			tweets.forEach((tweet:any) => {
				this.commentService.removeAllByTweetId(tweet._id);
			});
		});
		return this.tweetService.removeAllByUserId(req.user._id);
	}

	@Delete(':id')
	remove(@Param('id') id, @Req() req): Promise<any> {
		return this.tweetService.verifyTweetOwner(id, req.user._id).then((verfication) => {
			if (!verfication) throw new Error('You are not the owner of this tweet');
			this.commentService.removeAllByTweetId(id);
			return this.tweetService.remove(id);
		});
	}

	@Delete(':id/comments')
	removeAllCommentsByTweetId(@Param('id') id, @Req() req): Promise<any> {
		return this.tweetService.verifyTweetOwner(id, req.user._id).then((verfication) => {
			if (!verfication) throw new Error('You are not the owner of this tweet');
			return this.commentService.removeAllByTweetId(id);
		});
	}

	@Delete(':id/like')
	dislike(@Param('id') id, @Req() req): Promise<any> {
		return this.tweetService.dislike(id, req.user._id);
	}

	@Put(':id')
	update(@Param('id') id, @Body() tweet: InitTweetDto, @Req() req): Promise<Tweet> {
		return this.tweetService.verifyTweetOwner(id, req.user._id).then((verfication) => {
			if (!verfication) throw new Error('You are not the owner of this tweet');
			return this.tweetService.update(id, tweet);
		});
	}
}
