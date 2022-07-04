import { Inject, Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { CUSTOMER_REPOSITORY, PHONES_REPOSITORY } from 'src/core/constants';
import { Phone } from '../phones/phone.entity';
import { Customer } from './customer.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer,
    @Inject(PHONES_REPOSITORY) private readonly phonesRepository: typeof Phone,
  ) { }

  async create(customer: CreateCustomerDTO): Promise<Customer> {
    const data = instanceToPlain(customer);
    return await this.customerRepository.create<Customer>(data, {include: [this.phonesRepository]});
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async findOneById(id: number): Promise<Customer> {
    return await this.customerRepository.findOne<Customer>({ where: { id } });
  }

  async update(id: number, customer: UpdateCustomerDTO): Promise<Customer> {
    Object.keys(customer).forEach(key => {
      if (customer[key] === null) {
        delete customer[key];
      }
    });
    let customerRes = await this.customerRepository.findOne({ where: { id }})
    customerRes.set(customer);
    await customerRes.save();
    return customerRes;
  }

  async remove(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne<Customer>({ where: { id } });
    await customer.destroy();
  }
}
