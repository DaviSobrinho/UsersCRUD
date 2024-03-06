import { IsEmail, Length, MinLength} from "class-validator"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { IsCPF } from "./validator/numericCPF.validator"
import { PermissionEntity } from "src/permissions/permission.entity"

@Entity({name: 'users'})
@Unique(['email','cpf'])
export class UserEntity {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number
    @Column({name: 'name'})
    @Length(2,100)
    name: string
    @Column({name: 'email'})
    @IsEmail()
    email: string
    @IsCPF()
    @Column({name: 'cpf'})
    cpf: string
    @Column({name: 'password'})
    @MinLength(6)
    password: string
    @CreateDateColumn({name: 'createdAt'})
    createdAt: string
    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: string
    @ManyToOne(() => PermissionEntity)
    @JoinColumn({ name: 'id_permission' })
    id_permission: number
    @Column({name: 'flg_active', default: true})
    flg_active: boolean
}