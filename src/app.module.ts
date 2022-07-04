import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { CustomersModule } from './modules/customers/customers.module';
import { PhonesModule } from './modules/phones/phones.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    CustomersModule,
    PhonesModule,
  ],
})
export class AppModule {}
