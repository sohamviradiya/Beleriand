import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';
import { Tweet } from 'src/tweets/tweets.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: User|mongoose.Types.ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true })
	tweet: Tweet|mongoose.Types.ObjectId;

	@Prop({ required: true })
	content: string;

	@Prop({ required: true, default: new Date()})
	postedAt: Date;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
	likes: User[]|mongoose.Types.ObjectId[];
}

const CommentSchema = SchemaFactory.createForClass(Comment);
export default CommentSchema;
