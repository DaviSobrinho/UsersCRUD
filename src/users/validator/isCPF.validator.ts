import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, isNumber, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class IsCPFValidator implements ValidatorConstraintInterface{
    
    validate(value: any,_validationArguments?: ValidationArguments,): boolean {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(value);
    }
}

export const IsCPF = (validationOptions? : ValidationOptions) =>  {
    return(object: Object, property : string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options : validationOptions,
            constraints : [],
            validator : IsCPFValidator
        })
    }
}