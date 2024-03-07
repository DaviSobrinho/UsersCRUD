import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { EmailNotExists } from "../validator/emailNotExists.validator";
import { CPFNotExists } from "../validator/cpfNotExists.validator";
import { IsCPF } from "../validator/isCPF.validator";
import { PermissionIdNotExists } from "src/permissions/validator/permissionIdNotExists.validator";

export class UpdateUserDTO{
    @IsOptional()
    @IsString()
    @Length(2,100,{message :'The name is not valid'})
    name : string;
    @IsOptional()
    @IsEmail(undefined, {message :'The email is not valid'})
    @EmailNotExists({message: 'The email is already beeing used'})
    email : string;
    @IsString()
    @IsOptional()
    @MinLength(6)
    password : string;
    @IsOptional()
    @IsCPF({message: 'The CPF is not valid' })
    @CPFNotExists({message: 'The CPF is already beeing used'})
    cpf: string;
    @IsNumber()
    @IsOptional()
    @PermissionIdNotExists({message: 'The permission does not exists'})
    id_permission: number
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}