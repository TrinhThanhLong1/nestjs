import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/configs/database/database.module';
import { SampleController } from './sample.controller';
import { sampleProvider } from './sample.provider';
import { SampleRepository } from './sample.repository';
import { SampleService } from './sample.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SampleController],
  providers: [SampleService, SampleRepository, ...sampleProvider],
  exports: [SampleService],
})
export class SampleModule {}
