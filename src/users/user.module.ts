import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { EmailNotExistsValidator } from "./validator/emailNotExists.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { CPFNotExistsValidator } from "./validator/cpfNotExists.validator";
import { UserService } from "./user.service";
import { IsCPFValidator } from "./validator/isCPF.validator";
import { PermissionIdNotExistsValidator } from "src/permissions/validator/permissionIdNotExists.validator";
import { PermissionModule } from "src/permissions/permission.module";
import { EmailExistsValidator } from "./validator/emailExists.validator";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule, forwardRef(() => PermissionModule)],
    controllers: [UserController],
    providers: [EmailNotExistsValidator, CPFNotExistsValidator, IsCPFValidator, UserService, PermissionIdNotExistsValidator,EmailExistsValidator, AuthService],
    exports: [UserService, EmailNotExistsValidator,EmailExistsValidator, TypeOrmModule.forFeature([UserEntity])]
})

export class UserModule {}
