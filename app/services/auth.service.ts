import { AuthRepository } from "app/repositories/auth.repository";
import { SuccessResponse, ErrorResponse } from "app/utilities/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { Login, Register } from "app/models/dto/Auth";
import { UseValidationError } from "app/utilities/validationError";
import {
  GetHashPassword,
  GetSalt,
  GetToken,
  ValidatePassword,
  VerifyToken,
} from "app/utilities/password";
import { UserModel } from "app/models/UserModel";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthService {
  constructor(@inject(AuthRepository) private repository: AuthRepository) {}

  async RegisterUser(event: any) {
    try {
      const data = plainToClass(Register, event.body);
      const error = await UseValidationError(data);

      const salt = await GetSalt();
      const hashPassword = await GetHashPassword(data.password, salt);
      if (error) return ErrorResponse(404, error);
      const payload: UserModel = {
        email: data.email,
        phone: data.phone,
        user_type: "BUYER",
        salt: salt,
        password: hashPassword,
      };

      const user = await this.repository.RegisterUserAccount(payload);
      if (user) return SuccessResponse(user);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async LoginUser(event: APIGatewayProxyEventV2) {
    try {
      const data = plainToClass(Login, event.body);
      const error = await UseValidationError(data);

      if (error) return ErrorResponse(404, error);

      const user = await this.repository.FindAccount(data.email);

      if (!user) return ErrorResponse(404, "User not found with that id.");
      const verify_password = await ValidatePassword(
        data.password,
        user.password,
        user.salt
      );

      if (!verify_password) {
        throw new Error("Invalid credential.");
      }
      const token = GetToken(user);

      if (user) return SuccessResponse({ token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;

    if (token) {
      const payload = await VerifyToken(token);
      if (payload) {
        return SuccessResponse({ message: "User verify successfully." });
      } else {
        return ErrorResponse(401, "Invalid token payload.");
      }
    }

    return SuccessResponse({ message: "User verify successfully." });
  }
}
