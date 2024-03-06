import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
    private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, permission: user.id_permission };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
