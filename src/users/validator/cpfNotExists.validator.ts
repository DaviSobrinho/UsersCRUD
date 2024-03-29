import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, isNumber, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({async: true})
export class CPFNotExistsValidator implements ValidatorConstraintInterface{
    
    constructor(private userRepository : UserService){}

    async validate(value: any,_validationArguments?: ValidationArguments,): Promise<boolean> {
        const userWithCPFExists = await this.userRepository.getUserByCPF(value)
        return !userWithCPFExists
    }
}

export const CPFNotExists = (validationOptions? : ValidationOptions) =>  {
    return(object: Object, property : string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options : validationOptions,
            constraints : [],
            validator : CPFNotExistsValidator
        })
    }
}