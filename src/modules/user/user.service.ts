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
    let user;
    try {
      const value = new UserEntity();
      value['username'] = data.username;
      value['password'] = data.password;
      // execute some operations on this transaction:
      user = await queryRunner.manager.save(value);
      if (user.id === 9) await queryRunner.rollbackTransaction();
      // commit transaction now:
      await queryRunner.commitTransaction();
      console.log('commit');
    } catch (err) {
      // since we have errors let's rollback changes we made
      console.log("rolback");
      return err.message;
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }

    return user;

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
