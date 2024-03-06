import { MaxLength } from "class-validator"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"

@Entity({name: 'permissions'})
@Unique(['permission'])
export class PermissionEntity {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number
    @Column({name: 'permission'})
    @MaxLength(100)
    permission: string
    @CreateDateColumn({name: 'createdAt'})
    createdAt: string
    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: string
    @Column({name: 'flg_active', default: true})
    flg_active: boolean
}