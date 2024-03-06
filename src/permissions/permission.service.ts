import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEntity } from "./permission.entity";
import { Repository } from "typeorm";
import { GetPermissionDTO } from "./dto/getPermission.dto";
import { UpdatePermissionDTO } from "./dto/updatePermission.dto";

@Injectable()
export class PermissionService{
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>
    ){}
    async createPermission(permissionEntity: PermissionEntity){
        await this.permissionRepository.save(permissionEntity)
    }
    async updatePermission(id: number, updatedPermission: UpdatePermissionDTO) {
        await this.permissionRepository.update(id, updatedPermission);
    }
    async deletePermission(id: number) {
        await this.permissionRepository.delete(id);
    }
    async getPermissionById(id: number){
        const savedPermission = await this.permissionRepository.findOne({where: {id}});
        return savedPermission
    }
    async getPermissionByName(permission: string){
        const savedPermission = await this.permissionRepository.findOne({where : {permission}});
        return savedPermission
    }
    async getPermissions(){
        const savedPermissions = await this.permissionRepository.find();
        const savedPermissionsList = savedPermissions.map(
            permission => new GetPermissionDTO(
                permission.id,
                permission.permission,
                permission.createdAt,
                permission.updatedAt,
                permission.flg_active,
            )
        )
        return savedPermissionsList 
    }
}