import { Column, Entity } from 'typeorm';
import { ENTITY_CONST } from './sample.constant';
import { BaseEntity } from 'src/shared/database/base-entity';
import { defaultNameLength } from 'src/shared/constants/common.constants';

@Entity({ name: ENTITY_CONST.MODEL_NAME })
export class SampleEntity extends BaseEntity {
  @Column({ length: defaultNameLength })
  name: string;
}
