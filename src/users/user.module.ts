import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { EmailExistsValidator } from "./validator/emailExists.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { CPFExistsValidator } from "./validator/cpfExists.validator";
import { UserService } from "./user.service";
import { NumericCPFValidator } from "./validator/numericCPF.validator";
import { PermissionExistsByIdValidator } from "src/permissions/validator/permissionExistsById.validator";
import { PermissionModule } from "src/permissions/permission.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), PermissionModule],
    controllers: [UserController],
    providers: [EmailExistsValidator, CPFExistsValidator, NumericCPFValidator, UserService, PermissionExistsByIdValidator]
})

export class UserModule {}
