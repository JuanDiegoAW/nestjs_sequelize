import { PHONES_REPOSITORY } from 'src/core/constants';
import { Phone } from './phone.entity';

export const phonesProviders = [{
  provide: PHONES_REPOSITORY,
  useValue: Phone,
}];