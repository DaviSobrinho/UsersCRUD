import { Body, Controller, Get, HttpCode, HttpStatus, Post,
    Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/loginAuth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './authPublicRoutes.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
