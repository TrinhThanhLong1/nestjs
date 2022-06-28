import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmRepository } from 'src/shared/database/typeorm.repository';
import { Repository } from 'typeorm';
import { ENTITY_CONST } from './user.constant';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends TypeOrmRepository<UserEntity> {
  constructor(
    @Inject(ENTITY_CONST.MODEL_PROVIDER)
    portfolioEntity: Repository<UserEntity>,
  ) {
    super(portfolioEntity);
  }
}
