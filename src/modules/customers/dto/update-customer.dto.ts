import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UpdatePhoneDTO } from "src/modules/phones/dto/update-phone.dto";

export class UpdateCustomerDTO {
  readonly full_name:string;
  readonly address:string;
  readonly observations:string;
  @ValidateNested({ each: true })
  @Type(() => UpdatePhoneDTO)
  readonly phones: UpdatePhoneDTO[];
}
