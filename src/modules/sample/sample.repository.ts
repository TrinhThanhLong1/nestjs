import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmRepository } from 'src/shared/database/typeorm.repository';
import { Repository } from 'typeorm';
import { ENTITY_CONST } from './sample.constant';
import { SampleEntity } from './sample.entity';

@Injectable()
export class SampleRepository extends TypeOrmRepository<SampleEntity> {
  constructor(
    @Inject(ENTITY_CONST.MODEL_PROVIDER)
    portfolioEntity: Repository<SampleEntity>,
  ) {
    super(portfolioEntity);
  }
}
