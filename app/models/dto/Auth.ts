import { IsEmail, Length } from "class-validator";

export class Login {
  @IsEmail()
  email!: string;
  @Length(8, 20)
  password!: string;
}

export class Register extends Login {
  @Length(9, 13)
  phone!: string;
}
