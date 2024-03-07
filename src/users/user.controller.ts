import { Body, Controller, Delete, Get, Param, Post, Put, Request, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { GetUserDTO } from "./dto/getUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { Public } from "src/auth/authPublicRoutes.decorator";
import { AuthService } from "src/auth/auth.service";

@Controller()
export class UserController{
    constructor(
        private userService: UserService, private authService: AuthService
    ){}
    @Public()
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
    async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDTO, @Request() req) {
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.id != id && userJWTDTO.permission == 3) {
                throw new UnauthorizedException('Permission denied');
            } else {
                await this.userService.updateUser(id, userData);
                return {
                    user: new GetUserDTO(undefined, userData.name),
                    message: 'User updated successfully'
                };
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    @Get('/user/:id')
    async getUserByID(@Param('id') id: number, @Request() req) {
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.id != id && userJWTDTO.permission == 3) {
                throw new UnauthorizedException('Permission denied');
            } else {
                const savedUser = await this.userService.getUserById(id);
                return savedUser;
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    @Get('/users')
    async getUsers(@Request() req) {
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.permission == 3) {
                throw new UnauthorizedException('Permission denied');
            } else {
                const savedUsers = await this.userService.getUsers();
                return savedUsers;
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    async deleteUserDTO(@Param('id') id: number, @Request() req) {
        try {
            const token = req.headers.authorization
            const userJWTDTO = await this.authService.getUserJWTDTO(token);
            if (userJWTDTO.id == id || userJWTDTO.permission != 3) {
                await this.userService.deleteUser(id);
                return {
                    message: 'User deleted'
                };
            } else {
                throw new UnauthorizedException('Permission denied');
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    
}