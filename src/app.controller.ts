import { Controller, Get, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/auth.constants';

@Controller('')
export class AppController {
	constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

	@Public()
	@Get()
	initclient(): string {
		return 'Welcome to Intelligentsia';
	}

	@Public()
	@Post()
	initserver(): string {
		return 'Intelligentsia is a social media platform for the intellectually curious.';
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth')
	async login(@Request() req) {
		return await this.authService.login(req.user);
	}

	@Get('auth')
	@UseGuards(JwtAuthGuard)
	profile(@Request() req) {
		return req.user;
	}

	@Delete('auth')
	@UseGuards(JwtAuthGuard)
	logout(@Request() req) {
		return this.authService.logout(req.user);
	}
}
