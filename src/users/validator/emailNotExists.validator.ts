import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({async: true})
export class EmailNotExistsValidator implements ValidatorConstraintInterface{
    
    constructor(private userRepository : UserService){}

    async validate(value: any,_validationArguments?: ValidationArguments,): Promise<boolean> {
        const userWithEmailExists = await this.userRepository.getUserByEmail(value)
        return !userWithEmailExists
    }
}

export const EmailNotExists = (validationOptions? : ValidationOptions) =>  {
    return(object: Object, property : string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options : validationOptions,
            constraints : [],
            validator : EmailNotExistsValidator
        })
    }
}