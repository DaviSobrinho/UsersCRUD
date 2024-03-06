import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDTO } from "./dto/createPermission.dto";
import { PermissionEntity } from "./permission.entity";
import { GetPermissionDTO } from "./dto/getPermission.dto";
import { UpdatePermissionDTO } from "./dto/updatePermission.dto";
@Controller()
export class PermissionController{
    constructor(
        private permissionService: PermissionService
    ){}
    @Post('/permission')
    async createPermission(@Body() permissionData: CreatePermissionDTO){
        const permissionEntity = new PermissionEntity()
        permissionEntity.permission = permissionData.permission
        permissionEntity.flg_active = permissionData.flg_active
        
        this.permissionService.createPermission(permissionEntity)

        return{
            permission: new GetPermissionDTO(undefined, permissionEntity.permission),
            message: 'Permission created successfully'
        }
    }
    @Get('/permission/:id')
    async getPermission(@Param('id') id: string){
        const savedPermission = await this.permissionService.getPermissionById(Number(id));
        return savedPermission
    }
    @Get('/permissions')
    async getPermissions(){
        const savedPermissions = await this.permissionService.getPermissions();
        return savedPermissions;
    }
    @Put('/permission/:id')
    async updatePermission(@Param('id') id: number, @Body() permissionData: UpdatePermissionDTO){
        await this.permissionService.updatePermission(id,permissionData);
        return {
            permission: new GetPermissionDTO(undefined, permissionData.permission),
            message: 'Permission updated successfully'
        }
    }
    @Delete('/permission/:id')
    async deletePermissionDTO(@Param('id') id: number){
        await this.permissionService.deletePermission(id)
        return {
            message: 'Permission deleted'
        };
    }
}