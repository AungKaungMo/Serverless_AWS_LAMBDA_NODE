import { SuccessResponse, ErrorResponse } from "app/utilities/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export class PaymentService {
  constructor() {}

  async GetPayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "Payment get successfully." });
  }

  async CreatePayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "Payment created successfully." });
  }

  async UpdatePayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "Payment update successfully." });
  }
}
