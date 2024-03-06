import { IsBoolean, IsOptional, IsString, MaxLength} from "class-validator";
import { PermissionExistsByName } from "../validator/permissionExistsByName.validator";

export class CreatePermissionDTO{
    @PermissionExistsByName({message: 'Permission is already beeing used'})
    @IsString()
    @MaxLength(100)
    permission: string
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}