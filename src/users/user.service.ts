import { Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private configService: ConfigService
    ){}
    async createUser(userEntity: UserEntity){
        userEntity.password = await this.cryptPassword(userEntity.password)
        await this.userRepository.save(userEntity)
    }
    async updateUser(id: number, updatedUser: UpdateUserDTO) {
        if(updatedUser.password != null){
            updatedUser.password = await this.cryptPassword(updatedUser.password)
        }
        await this.userRepository.update(id, updatedUser);
    }
    async deleteUser(id: number) {
        await this.userRepository.delete(id);
    }
    async getUserByCPF(cpf: string){
        const savedUser = await this.userRepository.createQueryBuilder('user')
            .leftJoin('user.id_permission', 'permission')
            .select([
            'user.id as id',
            'user.name as name',
            'user.email as email',
            'user.cpf as cpf',
            'user.password as password',
            'user.createdAt as createdAt',
            'user.updatedAt as updatedAt',
            'user.flg_active as flg_active',
            'permission.id as id_permission',
            ])
            .where('user.cpf = :cpf', { cpf: cpf })
            .getRawOne();
        return savedUser
    }
    async getUserById(id: number) {
        const savedUser = await this.userRepository.createQueryBuilder('user')
            .leftJoin('user.id_permission', 'permission')
            .select([
            'user.id as id',
            'user.name as name',
            'user.email as email',
            'user.cpf as cpf',
            'user.password as password',
            'user.createdAt as createdAt',
            'user.updatedAt as updatedAt',
            'user.flg_active as flg_active',
            'permission.id as id_permission',
            ])
            .where('user.id = :id', { id: id })
            .getRawOne();
        return savedUser
    }
    async getUserByEmail(email: string){
        const savedUser = await this.userRepository.createQueryBuilder('user')
            .leftJoin('user.id_permission', 'permission')
            .select([
            'user.id as id',
            'user.name as name',
            'user.email as email',
            'user.cpf as cpf',
            'user.password as password',
            'user.createdAt as createdAt',
            'user.updatedAt as updatedAt',
            'user.flg_active as flg_active',
            'permission.id as id_permission',
            ])
            .where('user.email = :email', { email: email })
            .getRawOne();
        return savedUser
    }
    async getUsers() {
        const savedUsers = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.id_permission", "permission")
        .select([
            "user.id as id",
            "user.name as name",
            "user.email as email",
            "user.cpf as cpf",
            "user.password as password",
            "user.createdAt as createdAt",
            "user.updatedAt as updatedAt",
            "user.flg_active as flg_active",
            "permission.id as id_permission",
        ])
        .getRawMany();
        return savedUsers.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            flg_active: user.flg_active,
            id_permission: user.id_permission
        }));
    }
    async cryptPassword(password: string){
        const bcrypt = require('bcrypt');
        const rounds = this.configService.get<string>('BCRYPT_SALT_ROUNDS')
        const secondpass = this.configService.get<string>('BCRYPT_SECOND_TEXT')
        const passwordWithSecondText = password + secondpass;
        const salt = await bcrypt.genSalt(parseInt(rounds));
        const hashedPassword = await bcrypt.hash(passwordWithSecondText, salt);
        return String(hashedPassword)
    }
    
}