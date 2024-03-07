import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "./permission.controller";
import { PermissionEntity } from "./permission.entity";
import { PermissionService } from "./permission.service";
import { PermissionNameNotExistsValidator } from "./validator/permissionNameNotExists.validator";
import { PermissionIdNotExistsValidator } from "./validator/permissionIdNotExists.validator";
import { AuthService } from "src/auth/auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { UserEntity } from "src/users/user.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([PermissionEntity]), forwardRef(() =>UserModule)],
    controllers: [PermissionController],
    providers: [PermissionService, PermissionNameNotExistsValidator, PermissionIdNotExistsValidator, AuthService, UserService, JwtService],
    exports: [PermissionService, PermissionIdNotExistsValidator]
})

export class PermissionModule {}
