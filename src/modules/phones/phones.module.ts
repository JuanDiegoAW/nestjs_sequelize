import { Module } from '@nestjs/common';
import { phonesProviders } from './phones.providers';

@Module({
  providers: [...phonesProviders],
})
export class PhonesModule {}