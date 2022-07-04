import { Sequelize } from 'sequelize-typescript';
import { Customer } from 'src/modules/customers/customer.entity';
import { Phone } from 'src/modules/phones/phone.entity';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    let config;
    switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
      config = databaseConfig.development;
      break;
    case TEST:
      config = databaseConfig.test;
      break;
    case PRODUCTION:
      config = databaseConfig.production;
      break;
    default:
      config = databaseConfig.development;
    }
    const sequelize = new Sequelize(config);
    sequelize.addModels([Customer, Phone]);
    await sequelize.sync();
    return sequelize;
  },
}];