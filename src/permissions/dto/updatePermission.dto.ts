import { IsBoolean,  IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import { PermissionNameNotExists } from "../validator/permissionNameNotExists.validator";

export class UpdatePermissionDTO{
    @IsOptional()
    @IsString()
    @PermissionNameNotExists({message: 'Permission is already beeing used'})
    @MaxLength(100,{message :'The name is not valid'})
    permission : string;
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}