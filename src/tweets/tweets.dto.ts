import { IsNotEmpty } from 'class-validator';

export default class InitTweetDto {
	@IsNotEmpty({ message: 'Content is required' })
	content: string;

	@IsNotEmpty({ message: 'Title is required' })
	title: string;
}
