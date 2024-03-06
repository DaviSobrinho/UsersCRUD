import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { GetUserDTO } from "./dto/getUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Controller()
export class UserController{
    constructor(
        private userService: UserService
    ){}
    @Post('/user')
    async createUser(@Body() userData: CreateUserDTO){
        const userEntity = new UserEntity()
        userEntity.name = userData.name
        userEntity.email = userData.email
        userEntity.password = userData.password
        userEntity.cpf = userData.cpf
        userEntity.flg_active = userData.flg_active
        userEntity.id_permission = userData.id_permission
        
        this.userService.createUser(userEntity)

        return{
            user: new GetUserDTO(undefined, userEntity.name),
            message: 'User created successfully'
        }
    }
    @Put('/user/:id')
    async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDTO){
        await this.userService.updateUser(id,userData);
        return {
            user: new GetUserDTO(undefined, userData.name),
            message: 'User updated successfully'
        }
    }
    @Get('/user/:id')
    async getUser(@Param('id') id: number){
        const savedUser = await this.userService.getUserById(id);
        return savedUser
    }
    @Get('/users')
    async getUsers(){
        const savedUsers = await this.userService.getUsers();
        return savedUsers;
    }
    @Delete('/user/:id')
    async deleteUserDTO(@Param('id') id: number){
        await this.userService.deleteUser(id)
        return {
            message: 'User deleted'
        };
    }
}