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

  async create(customerDto: CreateCustomerDTO): Promise<Customer> {
    const data = instanceToPlain(customerDto);
    return await this.customerRepository.create<Customer>(data, {include: [this.phonesRepository]});
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async findOneById(id: number): Promise<Customer> {
    return await this.customerRepository.findOne<Customer>({ where: { id }, include: [this.phonesRepository]} );
  }

  async update(id: number, customerDto: UpdateCustomerDTO): Promise<Customer> {
    const data = instanceToPlain(customerDto);
    Object.keys(customerDto).forEach(key => {
      if (customerDto[key] === null) {
        delete customerDto[key];
      }
    });
    let updateCustomer = await this.customerRepository.findOne({ where: { id }, include: [this.phonesRepository]})
    updateCustomer.set(data);
    customerDto.phones.forEach(async (phone) => {
      if (typeof phone.id !== 'undefined') {
        let updatePhone = await this.phonesRepository.findOne({ where: { id: phone.id }})
        updatePhone.set(phone);
        updatePhone.save()
      } else {
        await this.phonesRepository.create<Phone>({...phone, phoneable_type: 'customer', phoneable_id: id })
      }
    });
    await updateCustomer.save();
    return updateCustomer;
  }

  async remove(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne<Customer>({ where: { id },  include: [this.phonesRepository] },);
    await customer.destroy();
  }
}
