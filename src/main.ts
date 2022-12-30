import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import * as compression from 'compression';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(compression());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
		}),
	);
	app.enableCors();
	await app.listen(3000);
}

bootstrap();
