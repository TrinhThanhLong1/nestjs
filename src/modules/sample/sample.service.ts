import { Injectable } from '@nestjs/common';

import { SampleRepository } from './sample.repository';

@Injectable()
export class SampleService {
  constructor(private readonly entityRepository: SampleRepository) {}
  get() {
    return {
      message: 'OK Test',
    };
  }
}
