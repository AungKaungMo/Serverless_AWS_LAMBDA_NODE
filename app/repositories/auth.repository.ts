import { UserModel } from "app/models/UserModel";
import { DBOperation } from "./dbOperation";

export class AuthRepository extends DBOperation {
  constructor() {
    super();
  }

  async RegisterUserAccount({
    email,
    password,
    phone,
    salt,
    user_type,
  }: UserModel) {
    const query =
      "INSERT INTO users(phone,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";

    const values = [phone, email, password, salt, user_type];
    const result = await this.executeQuery(query, values);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
  }

  async FindAccount(email: string) {
    const query =
      "SELECT user_id,email,password,salt,phone FROM users WHERE email = $1";
    const result = await this.executeQuery(query, [email]);

    if (result.rowCount && result.rowCount < 1) {
      throw new Error("User doesn't exist with that email.");
    }
    return result.rows[0] as UserModel;
  }
}
