import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { Customer } from "./customer.entity";
import { CustomersService } from "./customers.service";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { UpdateCustomerDTO } from "./dto/update-customer.dto";

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomersService) { }

  @Get()
  async get(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return await this.customerService.findOneById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateCustomerDTO) {
    return this.customerService.update(+id, updateClientDto);
  }

  @Post()
  async create(@Body(new ValidationPipe({transform: true})) customerDto: CreateCustomerDTO): Promise<Customer> {
    // create a new post and return the newly created post
    return await this.customerService.create(customerDto);
  }
}