import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreatePhoneDTO } from "src/modules/phones/dto/create-phone.dto";

export class CreateCustomerDTO {
  @IsNotEmpty()
  readonly full_name:string;
  readonly address:string;
  readonly observations:string;
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDTO)
  readonly phones: CreatePhoneDTO[];
}
