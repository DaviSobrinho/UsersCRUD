import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailNotExistsValidator } from 'src/users/validator/emailNotExists.validator';
import { EmailExistsValidator } from 'src/users/validator/emailExists.validator';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/user.service';
import { PermissionModule } from 'src/permissions/permission.module';

@Module({
  imports: [
    PermissionModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 300
        },
        global: true,}),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailNotExistsValidator,EmailExistsValidator, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
