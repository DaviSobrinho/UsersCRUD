import { IsBoolean, IsOptional, IsString, MaxLength} from "class-validator";
import { PermissionNameNotExists } from "../validator/permissionNameNotExists.validator";

export class CreatePermissionDTO{
    @PermissionNameNotExists({message: 'Permission is already beeing used'})
    @IsString()
    @MaxLength(100,{message: 'The permission name is too long'})
    permission: string
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}