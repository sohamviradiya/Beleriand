import { Controller, Get, Post, Delete, Put, Body, Param, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.schema';
import InitCommentDto from './comments.dto';
import { Public } from 'src/auth/auth.constants';
@Controller('comments')
export class CommentsController {
	constructor(private readonly commentService: CommentsService) {}

	@Public()
	@Get()
	findAll(): Promise<Comment[]> {
		return this.commentService.findAll();
	}

	@Public()
	@Get(':id')
	findOne(@Param('id') id): Promise<Comment> {
		return this.commentService.findOne(id);
	}

	@Post()
	create(@Body() comment: InitCommentDto, @Req() req, @Body('tweet') tweet: string): Promise<Comment> {
		return this.commentService.create({ ...comment }, req.user._id, tweet);
	}

	@Post(':id/like')
	like(@Param('id') id, @Req() req): Promise<Comment> {
		return this.commentService.like(id, req.user._id);
	}

	@Delete()
	removeAllByUserId(@Req() req): Promise<Comment> {
		return this.commentService.removeAllByUserId(req.user._id);
	}

	@Delete(':id')
	remove(@Param('id') id, @Req() req): Promise<Comment> {
		return this.commentService.verifyCommentOwner(id, req.user._id).then((verfication) => {
			if (!verfication) throw new Error('You are not the owner of this comment');
			return this.commentService.remove(id);
		});
	}

	@Delete(':id/like')
	dislike(@Param('id') id, @Req() req): Promise<Comment> {
		return this.commentService.dislike(id, req.user._id);
	}

	@Put(':id')
	update(@Param('id') id, @Body() comment: InitCommentDto, @Req() req): Promise<Comment> {
		return this.commentService.verifyCommentOwner(id, req.user._id).then((verfication) => {
			if (!verfication) throw new Error('You are not the owner of this comment');
			return this.commentService.update(id, comment);
		});
	}
}
