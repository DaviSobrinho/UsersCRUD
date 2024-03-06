import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { PermissionService } from "../permission.service";

@Injectable()
@ValidatorConstraint({async: true})
export class PermissionExistsByNameValidator implements ValidatorConstraintInterface{
    
    constructor(private permissionRepository : PermissionService){}

    async validate(value: any,_validationArguments?: ValidationArguments,): Promise<boolean> {
        const permissionWithNameExists = await this.permissionRepository.getPermissionByName(value)
        return !permissionWithNameExists
    }
}

export const PermissionExistsByName = (validationOptions? : ValidationOptions) =>  {
    return(object: Object, property : string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options : validationOptions,
            constraints : [],
            validator : PermissionExistsByNameValidator
        })
    }
}