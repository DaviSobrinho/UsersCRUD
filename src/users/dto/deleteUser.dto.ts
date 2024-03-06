import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";
import { EmailNotExists } from "src/users/validator/emailNotExists.validator";

export class DeleteUserDTO {
    
    @Length(2,100,{ message: 'The name must have between 2 and 100 digits' })
    name: string;
  
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @EmailNotExists({ message: 'Já existe um usuário com este e-mail' })
    email: string;
  
    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    password: string;

    @Length(11)
    cpf: string;

    
  }