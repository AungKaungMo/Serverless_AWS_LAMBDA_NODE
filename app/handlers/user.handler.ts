import { UserService } from "app/services/user.service";
import { ErrorResponse } from "app/utilities/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { container } from "tsyringe";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";

const service = container.resolve(UserService);

export const User = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();
  let response;
  switch (httpMethod) {
    case "get":
      response = await service.GetUser(event);
      break;
    // case "post":
    //   response = await middy(service.CreateProfile).use(bodyParser());
    //   break;
    // case "put":
    //   response = await service.UpdateUser(event);
    //   break;
    default:
      response = ErrorResponse(404, "404 Not found.");
  }

  return response;
};

export const CreateUserProfile = middy((event: APIGatewayProxyEventV2) => {
  return service.CreateProfile(event);
}).use(bodyParser());
