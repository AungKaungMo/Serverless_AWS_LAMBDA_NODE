const responseData = (statusCode: number, message: string, data?: unknown) => {
  if (data) {
    return {
      statusCode: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: message,
        data: data,
      }),
    };
  } else {
    return {
      statusCode: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: message,
      }),
    };
  }
};

export const SuccessResponse = (data: object) => {
  return responseData(200, "Success", data);
};

export const ErrorResponse = (code = 400, error: unknown) => {
  if (Array.isArray(error)) {
    const errorObj = error[0].constraints;
    const errorMessage = errorObj[Object.keys(errorObj)[0]] || "Error occured";

    return responseData(code, errorMessage);
  }

  return responseData(code, `${error}`);
};
