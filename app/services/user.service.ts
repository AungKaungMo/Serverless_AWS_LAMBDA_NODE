import { inject, injectable } from "tsyringe";
import { SuccessResponse, ErrorResponse } from "../utilities/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserRepository } from "app/repositories/user.repository";
import { VerifyToken } from "app/utilities/password";
import { plainToClass } from "class-transformer";
import { Profile } from "app/models/dto/Profile";
import { UseValidationError } from "app/utilities/validationError";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private repository: UserRepository) {}

  async GetUser(event: APIGatewayProxyEventV2) {
    try {
      const userData = { id: 1, name: "John Doe" }; // Example response
      return SuccessResponse(userData);
    } catch (error) {
      return ErrorResponse(500, error);
    }
  }

  async CreateUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully." });
  }

  // async UpdateUser(event: any) {
  //   const token = event.headers.authorization;

  //   if (token) {
  //     const payload = {
  //       first_name: event?.body?.first_name,
  //       last_name: event?.body?.last_name,
  //       user_type: event?.body?.user_type || "BUYER",
  //     };
  //     if (payload) {
  //       const user = await this.repository.UpdateUser(payload);
  //       if (user) return SuccessResponse(user);
  //     } else {
  //       return ErrorResponse(401, "Invalid token payload.");
  //     }
  //   }

  //   return SuccessResponse({ message: "User verify successfully." });
  // }

  async CreateProfile(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    if (token) {
      const payload: any = await VerifyToken(token);
      if (!payload) return ErrorResponse(403, "Authorization failed.");

      const data = plainToClass(Profile, event.body);
      const error = await UseValidationError(data);
      if (error) return ErrorResponse(404, error);

      console.log(data, "data address");
      console.log(data.address, "data address");
      console.log(Object.keys(data), "data keys");
      const result = await this.repository.CreateProfile(
        payload.user_id,
        data.address,
        data
      );
      return SuccessResponse({ message: "User profile created successfully." });
    }
  }
}
