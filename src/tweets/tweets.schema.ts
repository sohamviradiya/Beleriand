import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';
export type TweetDocument = HydratedDocument<Tweet>;

@Schema()
export class Tweet {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: User | mongoose.Types.ObjectId;

	@Prop({ required: true, default: '' })
	content: string;

	@Prop({ required: true, default: '' })
	title: string;

	@Prop({ default: new Date() })
	postedAt: Date;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
	likes: User[] | mongoose.Types.ObjectId[];
}

const TweetSchema = SchemaFactory.createForClass(Tweet);
export default TweetSchema;
