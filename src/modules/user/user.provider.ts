import { DataSource } from 'typeorm';
import { ENTITY_CONST } from './user.constant';
import { UserEntity } from './user.entity';

export const UserProvider = [
  {
    provide: ENTITY_CONST.MODEL_PROVIDER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE_MYSQL'],
  },
];
