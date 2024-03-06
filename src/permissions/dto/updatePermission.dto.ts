import { IsBoolean,  IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import { PermissionNotExistsByName } from "../validator/permissionExistsByName.validator";

export class UpdatePermissionDTO{
    @IsOptional()
    @IsString()
    @PermissionNotExistsByName({message: 'Permission is already beeing used'})
    @MaxLength(100,{message :'The name is not valid'})
    permission : string;
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}