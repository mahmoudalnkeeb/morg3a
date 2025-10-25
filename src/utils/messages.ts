type SuccessResponse<T = any> = {
  status: "success";
  data: T;
};

type FailResponse<T = any> = {
  status: "fail";
  data: T;
};

type ErrorResponse = {
  status: "error";
  message: string;
  code?: string | number;
  data?: any;
};

export type ApiResponse<T = any> =
  | SuccessResponse<T>
  | FailResponse<T>
  | ErrorResponse;

export function successResponse<T = any>(data: T): SuccessResponse<T> {
  return {
    status: "success",
    data,
  };
}

export function failResponse<T = any>(data: T): FailResponse<T> {
  return {
    status: "fail",
    data,
  };
}

export function errorResponse(
  message: string,
  code?: string | number,
  data?: any,
): ErrorResponse {
  return {
    status: "error",
    message,
    ...(code && { code }),
    ...(data && { data }),
  };
}
