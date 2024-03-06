import { IsEmail, IsString, MinLength } from "class-validator";
import { EmailExists } from "src/users/validator/emailNotExists.validator copy";

export class SignInDto {
    @IsEmail(undefined,{message: 'The email is invalid'})
    @EmailExists({message: 'There are no users for this email'})
    email: string;
    @MinLength(6)
    @IsString()
    password: string
}