import { CartService } from "app/services/cart.service";
import { ErrorResponse } from "app/utilities/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

const service = new CartService();

export const Cart = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();
  switch (httpMethod) {
    case "get":
      service.GetCart(event);
      break;
    case "post":
      service.CreateCart(event);
      break;
    case "put":
      service.UpdateCart(event);
      break;
    default:
      return ErrorResponse(404, "404 Not found.");
  }
};
