import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { EmailExists } from "../validator/emailExists.validator";
import { IsCPF } from "../validator/numericCPF.validator";
import { CPFExists } from "../validator/cpfExists.validator";
import { PermissionExistsById } from "src/permissions/validator/permissionExistsById.validator";

export class CreateUserDTO{
    @IsString()
    @Length(2,100,{message :'The name is not valid'})
    name : string;
    @IsEmail(undefined, {message :'The email is not valid'})
    @EmailExists({message: 'The email is already beeing used'})
    email : string;
    @MinLength(6)
    @IsString()
    password : string;
    @IsCPF({message: 'The CPF is not valid'})
    @CPFExists({message: 'The CPF is already beeing used'})
    cpf: string;
    @IsNumber()
    @PermissionExistsById({message: 'The permission does not exists'})
    id_permission: number
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}