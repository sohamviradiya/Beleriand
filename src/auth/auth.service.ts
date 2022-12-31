import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async validate(username: string, password: string): Promise<any> {
		const user: any = await this.usersService.findByUserName(username);
		if (user && user.password == password) {
			return { username: user.username, _id: user._id };
		}
		return null;
	}

	async login(user: any) {
		if (!user) throw new HttpException('Invalid credentials', 401);
		const payload = { username: user.username, sub: user._id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async logout(user: any) {
		if (!user) throw new HttpException('Invalid credentials', 401);
		return {
			access_token: null,
		};
	}
}
