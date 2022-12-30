import { IsNotEmpty } from 'class-validator';

export default class InitCommentDto {
	@IsNotEmpty()
	content: string;
}
