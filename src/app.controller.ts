import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return '';
	}

	@Post()
	createHello(): string {
		return '';
	}
}
