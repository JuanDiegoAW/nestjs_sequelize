import { IsEnum, IsNotEmpty } from "class-validator";

export class CreatePhoneDTO {
  @IsNotEmpty()
  readonly number:string;
  @IsNotEmpty()
  @IsEnum(['mobile', 'home', 'office', 'other'])
  readonly type:string;
}
