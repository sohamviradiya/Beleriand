import { HttpException, Injectable } from '@nestjs/common';
import InitUserDto from './users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(user: InitUserDto): Promise<User> {
		const newUser = new this.userModel(user);
		try {
			return await newUser.save();
		} catch (error) {
			if (error.code === 11000) throw new HttpException('Username or email already exists', 400);
			else throw new HttpException(error, 400);
		}
	}

	async findAll(): Promise<User[]> {
		return await this.userModel.find().exec();
	}

	async findOne(id: string): Promise<User> {
		if (!isValidObjectId(id)) throw new HttpException('Invalid user id', 400);
		return await this.userModel.findById(id).populate('following').exec();
	}

	async findByUserName(username: string): Promise<User> {
		return await this.userModel.findOne({ username }).exec();
	}

	async findFollowers(id: string): Promise<User[]> {
		if (!isValidObjectId(id)) throw new HttpException('Invalid user id', 400);
		return await this.userModel.find({ following: [id] }).exec();
	}

	async update(id: string, user: InitUserDto): Promise<User> {
		if (!isValidObjectId(id)) throw new HttpException('Invalid user id', 400);
		return await this.userModel
			.findByIdAndUpdate(id, user, { new: true })
			.exec();
	}

	async follow(id: string, followId: string): Promise<User> {
		if (!isValidObjectId(id)) throw new HttpException('Invalid user id', 400);
		return await this.userModel
			.findByIdAndUpdate(
				id,
				{ $addToSet: { following: followId } },
				{ new: true }
			)
			.populate("following")
			.exec();
	}

	async remove(id: string): Promise<User> {
		if (!isValidObjectId(id)) throw new HttpException('Invalid user id', 400);
		return await this.userModel.findByIdAndDelete(id).exec();
	}

	async unfollow(id: string, followId: string): Promise<User> {
		if (!isValidObjectId(id)) throw new HttpException('Invalid user id', 400);
		return await this.userModel.findByIdAndUpdate(id, { $pull: { following: followId } }, { new: true }).populate('following').exec();
	}
}
