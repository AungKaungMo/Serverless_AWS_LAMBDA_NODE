import { UserModel } from "app/models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "./response";
import { APP_SECRET } from "../config";

export const GetSalt = async () => {
  return await bcrypt.genSalt();
};

export const GetHashPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GetHashPassword(enteredPassword, salt)) === savedPassword;
};

export const GetToken = ({ user_id, email, phone, user_type }: UserModel) => {
  return jwt.sign(
    {
      user_id,
      email,
      phone,
      user_type,
    },
    APP_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const VerifyToken = async (token: string) => {
  try {
    if (token) {
      const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
      return payload as UserModel;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return ErrorResponse(500, error);
  }
};
