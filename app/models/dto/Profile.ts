import { Type } from "class-transformer";
import { IsEmail, Length, ValidateNested } from "class-validator";

export class Address {
  @Length(3, 32)
  addresses!: string;

  @Length(3, 20)
  city!: string;

  @Length(4, 6)
  postal_code!: string;

  @Length(3, 20)
  country!: string;
}

export class Profile {
  @Length(3, 32)
  first_name!: string;

  @Length(3, 32)
  last_name!: string;

  @Length(5, 6)
  user_type!: string;

  @Type(() => Address)
  address!: Address;
}
