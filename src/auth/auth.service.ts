import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { JWTDTO } from './dto/JWT.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,private configService: ConfigService,
  private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const bcrypt = require('bcrypt');
    const secondPass = this.configService.get<string>('BCRYPT_SECOND_TEXT')
    const authorized = await bcrypt.compare(pass+secondPass, user.password);
    if (!authorized) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { id: user.id, email: user.email, permission: user.id_permission };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async getUserJWTDTO(token: string): Promise<JWTDTO> {
    try {
        token = token.split(' ')[1];
        const { permission, email, id } = await this.jwtService.decode(token);
        return new JWTDTO(id, email, permission);
    } catch (error) {
        throw new UnauthorizedException('Invalid token');
    }
}
}
