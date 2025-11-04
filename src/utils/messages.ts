type Data = Record<string, string>;

type SuccessResponse<T = Data> = {
  status: 'success';
  data: T;
};

type FailResponse<T = Data> = {
  status: 'fail';
  data: T;
};

type ErrorResponse<T = Data> = {
  status: 'error';
  message: string;
  code?: string | number;
  data?: T;
};

export type ApiResponse<T = Data> =
  | SuccessResponse<T>
  | FailResponse<T>
  | ErrorResponse<T>;

export function successResponse<T = Data>(data: T): SuccessResponse<T> {
  return {
    status: 'success',
    data,
  };
}

export function failResponse<T = Data>(data: T): FailResponse<T> {
  return {
    status: 'fail',
    data,
  };
}

export function errorResponse<T = Data>(
  message: string,
  code?: string | number,
  data?: T,
): ErrorResponse<T> {
  return {
    status: 'error',
    message,
    ...(code ? { code } : {}),
    ...(data ? { data } : {}),
  };
}
