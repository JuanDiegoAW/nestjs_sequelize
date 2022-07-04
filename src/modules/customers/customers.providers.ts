import { CUSTOMER_REPOSITORY } from 'src/core/constants';
import { Customer } from './customer.entity';

export const customersProviders = [{
  provide: CUSTOMER_REPOSITORY,
  useValue: Customer,
}];