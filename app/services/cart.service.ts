import { SuccessResponse, ErrorResponse } from "app/utilities/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export class CartService {
  constructor() {}

  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "Cart get successfully." });
  }

  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "Cart created successfully." });
  }

  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "Cart update successfully." });
  }
}
