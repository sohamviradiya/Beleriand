import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';
@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
