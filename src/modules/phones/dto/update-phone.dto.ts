import { CreatePhoneDTO } from "./create-phone.dto";

export class UpdatePhoneDTO extends CreatePhoneDTO {
  readonly id: number;
}
