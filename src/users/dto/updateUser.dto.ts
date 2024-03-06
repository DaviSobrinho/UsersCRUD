import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { EmailExists } from "../validator/emailExists.validator";
import { CPFExists } from "../validator/cpfExists.validator";
import { IsCPF } from "../validator/numericCPF.validator";
import { PermissionExistsById } from "src/permissions/validator/permissionExistsById.validator";

export class UpdateUserDTO{
    @IsOptional()
    @IsString()
    @Length(2,100,{message :'The name is not valid'})
    name : string;
    @IsOptional()
    @IsEmail(undefined, {message :'The email is not valid'})
    @EmailExists({message: 'The email is already beeing used'})
    email : string;
    @IsString()
    @IsOptional()
    @MinLength(6)
    password : string;
    @IsOptional()
    @IsCPF({message: 'The CPF is not valid' })
    @CPFExists({message: 'The CPF is already beeing used'})
    cpf: string;
    @IsNumber()
    @IsOptional()
    @PermissionExistsById()
    id_permission: number
    @IsOptional()
    @IsBoolean()
    flg_active: boolean
}