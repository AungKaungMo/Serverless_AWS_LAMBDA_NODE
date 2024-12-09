import { PaymentService } from "app/services/payment.service";
import { ErrorResponse } from "app/utilities/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

const service = new PaymentService();

export const Payment = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();
  switch (httpMethod) {
    case "get":
      service.GetPayment(event);
      break;
    case "post":
      service.CreatePayment(event);
      break;
    case "put":
      service.UpdatePayment(event);
      break;
    default:
      return ErrorResponse(404, "404 Not found.");
  }
};
