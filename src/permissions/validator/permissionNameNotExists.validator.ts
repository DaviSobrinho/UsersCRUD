import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { PermissionService } from "../permission.service";

@Injectable()
@ValidatorConstraint({async: true})
export class PermissionNameNotExistsValidator implements ValidatorConstraintInterface{
    
    constructor(private permissionRepository : PermissionService){}

    async validate(value: any,_validationArguments?: ValidationArguments,): Promise<boolean> {
        const permissionNameNotExists = await this.permissionRepository.getPermissionByName(value)
        return !permissionNameNotExists
    }
}

export const PermissionNameNotExists = (validationOptions? : ValidationOptions) =>  {
    return(object: Object, property : string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options : validationOptions,
            constraints : [],
            validator : PermissionNameNotExistsValidator
        })
    }
}