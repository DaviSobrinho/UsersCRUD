import { IsBoolean, IsOptional, IsString, MaxLength} from "class-validator";
import { PermissionNotExistsByName } from "../validator/permissionExistsByName.validator";

export class CreatePermissionDTO{
    @PermissionNotExistsByName({message: 'Permission is already beeing used'})
    @IsString()
    @MaxLength(100)
    permission: string
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}