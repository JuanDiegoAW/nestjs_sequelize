import { Module } from '@nestjs/common';
import { phonesProviders } from '../phones/phones.providers';
import { CustomerController } from './customers.controller';
import { customersProviders } from './customers.providers';
import { CustomersService } from './customers.service';

@Module({
  providers: [CustomersService, ...customersProviders, ...phonesProviders],
  exports: [CustomersService],
  controllers: [CustomerController],
})
export class CustomersModule {}