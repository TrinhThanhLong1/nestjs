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
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: databaseConfig.synchronize == 'TRUE',
      });
      return dataSource.initialize();
    },
  },
];
