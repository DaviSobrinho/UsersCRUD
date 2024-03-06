import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PermissionModule } from './permissions/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    PermissionModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MySQLConfigService,
      inject: [MySQLConfigService]
  })]
})
export class AppModule {}
