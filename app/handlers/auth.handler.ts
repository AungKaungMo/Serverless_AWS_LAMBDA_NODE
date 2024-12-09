import { AuthService } from "app/services/auth.service";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";
import { container } from "tsyringe";

const service = container.resolve(AuthService);

export const Register = middy((event: APIGatewayProxyEventV2) => {
  return service.RegisterUser(event);
}).use(bodyParser());

export const Login = middy((event: APIGatewayProxyEventV2) => {
  return service.LoginUser(event);
}).use(bodyParser());

export const Verify = async (event: APIGatewayProxyEventV2) => {
  return service.VerifyUser(event);
};
