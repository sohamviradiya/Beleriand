import { Injectable } from "@nestjs/common";
import InitTweetDto from "./tweets.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { isValidObjectId, Model } from "mongoose";
import { Tweet, TweetDocument } from "./tweets.schema";

@Injectable()
export class TweetsService {
	constructor(
		@InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>
	) {}

	async create(tweet: InitTweetDto, user: string): Promise<Tweet> {
		const createdTweet = new this.tweetModel({
			...tweet,
			user: user,
			postedAt: new Date(),
			likes: [],
		});
		return createdTweet.save();
	}

	async findAll(): Promise<Tweet[]> {
		return await this.tweetModel.find().populate("user").exec();
	}

	async findOne(id: string): Promise<Tweet> {
		return await this.tweetModel
			.findById(id)
			.populate("user")
			.populate("likes")
			.exec();
	}

	async findAllByUserId(id: string): Promise<Tweet[]> {
		return await this.tweetModel.find({ user: id }).populate("user").exec();
	}

	async findAllLikedByUserId(id: string): Promise<Tweet[]> {
		return await this.tweetModel
			.find({ likes: [id] })
			.populate("user")
			.exec();
	}

	async verifyTweetOwner(id: string, user: string): Promise<boolean> {
		return (
			String(
				(await this.tweetModel.findById(id).select("user").exec()).user
			) == user
		);
	}

	async update(id: string, tweet: InitTweetDto): Promise<Tweet> {
		return await this.tweetModel
			.findByIdAndUpdate(id, tweet, { new: true })
			.exec();
	}

	async like(id: string, userId: string): Promise<Tweet> {
		return await this.tweetModel
			.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
			.populate("user")
			.populate("likes")
			.exec();
	}

	async remove(id: string): Promise<Tweet> {
		return await this.tweetModel.findByIdAndRemove(id).exec();
	}

	async removeAllByUserId(user: string): Promise<any> {
		return await this.tweetModel.deleteMany({ user: user }).exec();
	}

	async dislike(id: string, userId: string): Promise<Tweet> {
		return await this.tweetModel
			.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
			.populate("user")
			.populate("likes")
			.exec();
	}
}
