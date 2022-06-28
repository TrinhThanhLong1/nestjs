import Author from 'src/modules/user/author.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { DataSource } from 'typeorm';
import { databaseConfig } from '../configs.constants';

export const mysqlProviders = [
  {
    provide: 'DATA_SOURCE_MYSQL',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: databaseConfig.host,
        port: Number(databaseConfig.port),
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.database,
        entities: [UserEntity, Author],
        synchronize: databaseConfig.synchronize == 'TRUE',
      });
      return dataSource.initialize();
    },
  },
];
