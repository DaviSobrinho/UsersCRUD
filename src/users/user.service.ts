import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { GetUserDTO } from "./dto/getUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    async createUser(userEntity: UserEntity){
        await this.userRepository.save(userEntity)
    }
    async updateUser(id: number, updatedUser: UpdateUserDTO) {
        await this.userRepository.update(id, updatedUser);
    }
    async deleteUser(id: number) {
        await this.userRepository.delete(id);
    }
    async getUserByCPF(cpf: string){
        const savedUser = await this.userRepository.findOne({where: {cpf}});
        return savedUser
    }
    async getUserById(id: number) {
        const savedUser = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.id_permission", "permission")
            .where("user.id = :id", { id })
            .getOne();
        return savedUser;
    }
    async getUserByEmail(email: string){
        const savedUser = await this.userRepository.findOne({where : {email}});
        return savedUser
    }
    async getUsers() {
        const savedUsers = await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.id_permission", "permission")
            .getMany();
        return savedUsers;
    }
}