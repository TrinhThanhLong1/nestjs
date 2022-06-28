import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../user/dto/createUser.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findUser(username);
    if (!user) {
      throw new HttpException('NOT_FOUND_USER', HttpStatus.NOT_FOUND);
    }
    const check = await bcrypt.compare(password, user.password)
    if (!check) {
      throw new HttpException('UN_AUTHORIZED', HttpStatus.UNAUTHORIZED);
    };
    return user;
  }

  async login(data: CreateUserDto) {
    const user = await this.validateUser(data.username, data.password);
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      isSuccess: true,
      token: token,
    }
  }
}
