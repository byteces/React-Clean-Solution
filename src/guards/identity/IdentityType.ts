export interface registerDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: null | string;
  error: null | string;
  isSuccess: boolean;
  data: T;
}

// AuthResponse interface using ApiResponse with a specific data type
export interface AuthResponse {
  token: string;
}

export type SignInResponse = ApiResponse<AuthResponse>;
