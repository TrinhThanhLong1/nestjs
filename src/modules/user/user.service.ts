import { HttpException, HttpStatus, Inject, Injectable, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getDataSourceToken } from '@nestjs/typeorm';
import { mysqlProviders } from 'src/configs/database/typeorm.provider';
import { DataSource, DataSourceOptions, getConnection } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  private dataSource: DataSource;
  constructor(
    private readonly entityRepository: UserRepository,
    @Inject('DATA_SOURCE_MYSQL') mysqlDataProvider: DataSource,
    private jwtService: JwtService,
  ) {
    this.dataSource = mysqlDataProvider;
  }
  // async login(body) {
  //   const { username, password } = body;
  //   const condition = { where: { username: username } }
  //   const user = await this.entityRepository.findOneByCondition(condition);
  //   if (!user) {
  //     throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  //   }
  //   const payload = { username: user.username, sub: user.id };
  //   const token = this.jwtService.sign(payload)
  //   return { token: token };
  // }
  async create(data: CreateUserDto) {
    // const user = await this.entityRepository.save(data);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    let user, user1;
    try {
      const value = new UserEntity();
      value['username'] = data.username;
      value['password'] = data.password;
      // execute some operations on this transaction:
      user = await queryRunner.manager.insert(UserEntity, value);;
      value['password'] = "ashdghasgdhahsdg";
      user1 = await queryRunner.manager.insert(UserEntity, value);
      // commit transaction now:
      await queryRunner.commitTransaction();
      console.log('commit');
    } catch (err) {
      // since we have errors let's rollback changes we made
      console.log("rolback");
      await queryRunner.rollbackTransaction();
      return err.message;
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
    return user1;

  }

  async findUser(body): Promise<UserEntity> {
    // 
    const conditions = { where: { username: body } };

    let user = await this.entityRepository.findOneByCondition(conditions);

    if (user) {
      return user;
    }
    return null
  }
}
