import { Module } from '@nestjs/common';
import { mysqlProviders } from './typeorm.provider';

@Module({
  imports: [],
  providers: [...mysqlProviders],
  exports: [...mysqlProviders],
})
export class DatabaseModule {}
