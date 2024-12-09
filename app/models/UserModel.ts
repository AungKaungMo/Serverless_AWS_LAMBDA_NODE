import { AddressModel } from "./AddressModel";

export interface UserModel {
  user_id?: number;
  phone: string;
  email: string;
  salt: string; //For hash password
  password: string;
  user_type: "BUYER" | "SELLER";
  first_name?: string;
  last_name?: string;
  profile?: string;
  address?: AddressModel[];
}
