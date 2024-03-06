import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { PermissionService } from "../permission.service";

@Injectable()
@ValidatorConstraint({async: true})
export class PermissionExistsByIdValidator implements ValidatorConstraintInterface{
    
    constructor(private permissionRepository : PermissionService){}

    async validate(value: any,_validationArguments?: ValidationArguments,): Promise<boolean> {
        const permissionWithIdExists = await this.permissionRepository.getPermissionById(value)
        return !!permissionWithIdExists
    }
}

export const PermissionExistsById = (validationOptions? : ValidationOptions) =>  {
    return(object: Object, property : string) =>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options : validationOptions,
            constraints : [],
            validator : PermissionExistsByIdValidator
        })
    }
}