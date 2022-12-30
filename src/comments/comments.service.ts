import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';
import InitCommentDto from './comments.dto';

@Injectable()
export class CommentsService {
	constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

	async create(comment: InitCommentDto, user: string, tweet: string): Promise<Comment> {
		const createdComment = new this.commentModel({ ...comment, user: user, tweet: tweet, postedAt: new Date(), likes: [] });
		return await createdComment.save();
	}

	async findAll(): Promise<Comment[]> {
		return await this.commentModel.find().exec();
	}

	async findAllByTweetId(id: string): Promise<Comment[]> {
		return await this.commentModel.find({ tweet: id }).populate('user').exec();
	}

	async findAllByUserId(id: string): Promise<Comment[]> {
		return await this.commentModel.find({ user: id }).populate('tweet').exec();
	}

	async findAllLikedByUserId(id: string): Promise<Comment[]> {
		return await this.commentModel
			.find({ likes: [id] })
			.populate('tweet')
			.exec();
	}

	async verifyCommentOwner(id: string, user: string): Promise<boolean> {
		return String((await this.commentModel.findById(id).select('user').exec()).user) === user;
	}

	async findOne(id: string): Promise<Comment> {
		return await (await this.commentModel.findById(id).populate('user').populate('tweet')).populated('likes').exec();
	}

	async update(id: string, comment: InitCommentDto): Promise<Comment> {
		return await this.commentModel.findByIdAndUpdate(id, comment, { new: true }).exec();
	}

	async like(id: string, user: string): Promise<Comment> {
		return await this.commentModel.findByIdAndUpdate(id, { $addToSet: { likes: user } }, { new: true }).exec();
	}

	async remove(id: string): Promise<Comment> {
		return await this.commentModel.findByIdAndDelete(id).exec();
	}

	async removeAllByUserId(user: string): Promise<any> {
		return await this.commentModel.deleteMany({ user: user }).exec();
	}

	async removeAllByTweetId(tweet: string): Promise<any> {
		return await this.commentModel.deleteMany({ tweet: tweet }).exec();
	}

	async dislike(id: string, user: string): Promise<Comment> {
		return await this.commentModel.findByIdAndUpdate(id, { $pull: { likes: user } }, { new: true }).exec();
	}
}
