import { Controller, Get, UseGuards, Request, Post, Body, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  async create(@Body() body: CreateUserDto) {
    let { username, password } = body;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    password = hash;
    const data = { username, password };
    return this.userService.create(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getList')
  async getList() {
    return { message: 'hello' }
  }

  @Patch('/update')
  async update(@Body() body: Partial<CreateUserDto>) {
    return body
  }
}
