import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return "Hello, I'm a GET request";
	}

	@Post()
	createHello(): string {
		return "Hello, I'm a PUT request";
	}
}
