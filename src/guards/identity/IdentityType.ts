export interface registerDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface TApiResponse<T> {
  statusCode: number;
  message: null | string;
  error: null | string;
  isSuccess: boolean;
  data: T;
}
export interface ApiResponse {
  statusCode: number;
  message: null | string;
  error: null | string;
  isSuccess: boolean;
}
// AuthResponse interface using ApiResponse with a specific data type
export interface AuthResponse {
  token: string;
}

export interface verifyEmailDTO {
  email: string;
  email_token: string;
}

export interface ResetPasswordDTO {
  email: string;
  token: string;
  password: string;
}

export interface UserSession {
  uid: string;
  tokenExp: Date;
}

export type SignInResponse = TApiResponse<AuthResponse>;
