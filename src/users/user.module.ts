import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { EmailNotExistsValidator } from "./validator/emailNotExists.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { CPFNotExistsValidator } from "./validator/cpfNotExists.validator";
import { UserService } from "./user.service";
import { IsCPFValidator } from "./validator/numericCPF.validator";
import { PermissionExistsByIdValidator } from "src/permissions/validator/permissionExistsById.validator";
import { PermissionModule } from "src/permissions/permission.module";
import { EmailExistsValidator } from "./validator/emailExists.validator copy";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), PermissionModule],
    controllers: [UserController],
    providers: [EmailNotExistsValidator, CPFNotExistsValidator, IsCPFValidator, UserService, PermissionExistsByIdValidator,EmailExistsValidator],
    exports: [UserService, EmailNotExistsValidator,EmailExistsValidator]
})

export class UserModule {}
