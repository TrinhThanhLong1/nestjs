import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateUserDto from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { };

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: CreateUserDto) {
    const data = { username: body.username, password: body.password }
    return this.authService.login(data);
  }


}
