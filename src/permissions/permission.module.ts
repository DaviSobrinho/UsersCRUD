import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "./permission.controller";
import { PermissionEntity } from "./permission.entity";
import { PermissionService } from "./permission.service";
import { PermissionExistsByNameValidator } from "./validator/permissionExistsByName.validator";
import { PermissionExistsByIdValidator } from "./validator/permissionExistsById.validator";

@Module({
    imports: [TypeOrmModule.forFeature([PermissionEntity])],
    controllers: [PermissionController],
    providers: [PermissionService, PermissionExistsByNameValidator, PermissionExistsByIdValidator],
    exports: [PermissionService, PermissionExistsByIdValidator]
})

export class PermissionModule {}
