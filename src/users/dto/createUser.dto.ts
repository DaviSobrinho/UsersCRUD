import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { EmailNotExists as EmailNotExists } from "../validator/emailNotExists.validator";
import { IsCPF } from "../validator/isCPF.validator";
import { CPFNotExists } from "../validator/cpfNotExists.validator";
import { PermissionIdNotExists } from "src/permissions/validator/permissionIdNotExists.validator";

export class CreateUserDTO{
    @IsString()
    @Length(2,100,{message :'The name is not valid'})
    name : string;
    @IsEmail(undefined, {message :'The email is not valid'})
    @EmailNotExists({message: 'The email is already beeing used'})
    email : string;
    @MinLength(6)
    @IsString()
    password : string;
    @IsCPF({message: 'The CPF is not valid'})
    @CPFNotExists({message: 'The CPF is already beeing used'})
    cpf: string;
    @IsNumber()
    @PermissionIdNotExists({message: 'The permission does not exists'})
    id_permission: number
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}