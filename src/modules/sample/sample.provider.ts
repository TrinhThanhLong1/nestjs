import { DataSource } from 'typeorm';
import { ENTITY_CONST } from './sample.constant';
import { SampleEntity } from './sample.entity';

export const sampleProvider = [
  {
    provide: ENTITY_CONST.MODEL_PROVIDER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SampleEntity),
    inject: ['DATA_SOURCE_MYSQL'],
  },
];
