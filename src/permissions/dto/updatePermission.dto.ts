import { IsBoolean,  IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import { PermissionExistsByName } from "../validator/permissionExistsByName.validator";

export class UpdatePermissionDTO{
    @IsOptional()
    @IsString()
    @PermissionExistsByName({message: 'Permission is already beeing used'})
    @MaxLength(100,{message :'The name is not valid'})
    permission : string;
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}