import { Body, Controller, Delete, Get, Param, Post, Put, Request, UnauthorizedException } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDTO } from "./dto/createPermission.dto";
import { PermissionEntity } from "./permission.entity";
import { GetPermissionDTO } from "./dto/getPermission.dto";
import { UpdatePermissionDTO } from "./dto/updatePermission.dto";
import { Public } from "src/auth/authPublicRoutes.decorator";
import { AuthService } from "src/auth/auth.service";
@Controller()
export class PermissionController{
    constructor(
        private permissionService: PermissionService, private authService: AuthService
    ){}
    @Post('/permission')
    async createPermission(@Body() permissionData: CreatePermissionDTO, @Request() req){
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.permission == 1) {
                const permissionEntity = new PermissionEntity()
                permissionEntity.permission = permissionData.permission
                permissionEntity.flg_active = permissionData.flg_active
                
                this.permissionService.createPermission(permissionEntity)

                return{
                    permission: new GetPermissionDTO(undefined, permissionEntity.permission),
                    message: 'Permission created successfully'
                }
            } else {
                throw new UnauthorizedException('Permission denied');
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    @Get('/permission/:id')
    async getPermission(@Param('id') id: string, @Request() req){
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.permission == 1) {
                const savedPermission = await this.permissionService.getPermissionById(Number(id));
                return savedPermission
            } else {
                throw new UnauthorizedException('Permission denied');
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    @Get('/permissions')
    async getPermissions(@Request() req){
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.permission == 1) {
                const savedPermissions = await this.permissionService.getPermissions();
                return savedPermissions;
            } else {
                throw new UnauthorizedException('Permission denied');
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    @Put('/permission/:id')
    async updatePermission(@Param('id') id: number, @Body() permissionData: UpdatePermissionDTO, @Request() req){
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.permission == 1) {
                await this.permissionService.updatePermission(id,permissionData);
                return {
                    permission: new GetPermissionDTO(undefined, permissionData.permission),
                    message: 'Permission updated successfully'
                }
            } else {
                throw new UnauthorizedException('Permission denied');
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    @Delete('/permission/:id')
    async deletePermissionDTO(@Param('id') id: number, @Request() req){
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.permission == 1) {
                await this.permissionService.deletePermission(id)
                    return {
                        message: 'Permission deleted'
                    };
            } else {
                throw new UnauthorizedException('Permission denied');
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}