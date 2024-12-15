// src/app/interfaces/login.interface.ts
export interface LoginRequest {
  email: string;
  security_key: string;

}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}


export interface UserRegister {
  email: string;
}


export interface RegisterResponse {
  message: string;
}
