import {
	IsEmail,
	IsNotEmpty,
	Length,
	Matches,
	NotContains,
	IsLowercase,
} from "class-validator";

export default class InitUserDto {
	@IsNotEmpty({ message: "Username is required" })
	@IsLowercase({ message: "Username must be lowercase" })
	username: string;

	@IsEmail({}, { message: "Invalid email" })
	email: string;

	@Length(8, 20, { message: "Password must be between 8 and 20 characters" })
	@Matches(/(?=.*[a-z])/g, {
		message: "Password must contain at least one lowercase letter",
	})
	@Matches(/(?=.*[A-Z])/g, {
		message: "Password must contain at least one uppercase letter",
	})
	@Matches(/(?=.*[0-9])/g, {
		message: "Password must contain at least one number",
	})
	@Matches(/(?=.*[!@#$%^&*~`?/])/g, {
		message: "Password must contain at least one special character",
	})
	@NotContains(" ", { message: "Password must not contain spaces" })
	password: string;

	@IsNotEmpty()
	firstName: string;

	lastName: string;

	avatar: string;

	bio: string;

	country: string;
}
