import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true, default: new Date() })
	joinedAt: Date;

	@Prop({ required: true, minlength: 8 })
	password: string;

	@Prop({ required: true })
	firstName: string;

	@Prop({ default: "" })
	lastName: string;

	@Prop({ default: null })
	avatar: string;

	@Prop({ default: "" })
	bio: string;

	@Prop({ default: "" })
	country: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
	following: User[];
}

const UserSchema = SchemaFactory.createForClass(User);

export default UserSchema;
