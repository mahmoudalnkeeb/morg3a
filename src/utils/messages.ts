interface ApiResponse {
  status: "success" | "error";
  message: string;
  data?: any;
  error?: any;
}

export function successResponse(message: string, data?: any): ApiResponse {
  return {
    status: "success",
    message,
    data,
  };
}

export function errorResponse(message: string, error?: any): ApiResponse {
  return {
    status: "error",
    message,
    error,
  };
}
