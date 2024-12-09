import { UserModel } from "app/models/UserModel";
import { DBClient } from "app/utilities/databaseClient";
import { DBOperation } from "./dbOperation";
import { Address, Profile } from "app/models/dto/Profile";

export class UserRepository extends DBOperation {
  constructor() {
    super();
  }

  async UpdateUser(
    user_id: number,
    first_name: string,
    last_name: string,
    user_type: string
  ) {
    const query =
      "UPDATE users SET first_name=$1, last_name=$2, user_type=$3 WHERE user_id=$4 RETURNING *";
    const values = [first_name, last_name, user_type, user_id];
    const result = await this.executeQuery(query, values);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
    throw new Error("failed to update user!");
  }

  async CreateProfile(
    user_id: number,
    { addresses, city, postal_code, country }: Address,
    { first_name, last_name, user_type }: Profile
  ) {
    // const {  } = address;

    console.log({ addresses, city, postal_code, country }, "Address details");

    const updateUser = await this.UpdateUser(
      user_id,
      first_name,
      last_name,
      user_type
    );

    const query =
      "INSERT INTO address(user_id,addresses, city, postal_code, country) VALUES($1,$2,$3,$4,$5) RETURNING *";

    const values = [user_id, addresses, city, postal_code, country];
    const result = await this.executeQuery(query, values);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }

    throw new Error("Profile created fail.");
  }
}
