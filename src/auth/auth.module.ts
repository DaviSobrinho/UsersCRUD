import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailNotExistsValidator } from 'src/users/validator/emailNotExists.validator';
import { EmailExistsValidator } from 'src/users/validator/emailExists.validator copy';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants, jwtConstantsFactory } from './constants';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: jwtConstantsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailNotExistsValidator,EmailExistsValidator, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  exports: [AuthService]
})
export class AuthModule {}
