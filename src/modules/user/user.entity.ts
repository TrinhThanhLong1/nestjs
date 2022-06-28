import { Column, Entity } from 'typeorm';
import { ENTITY_CONST } from './user.constant';
import { BaseEntity } from 'src/shared/database/base-entity';
import { defaultNameLength } from 'src/shared/constants/common.constants';
import { Exclude } from 'class-transformer';

@Entity({ name: ENTITY_CONST.MODEL_NAME })
export class UserEntity extends BaseEntity {
  @Column({ length: defaultNameLength, unique: true })
  username: string;
  @Column({})
  password: string;
  @Column({
    nullable: true
  })
  @Exclude()
  public currentHashedRefreshToken: string;
}
