export interface IUserState {
  isLoading: boolean;
  error: Error | null;
  signupDone: boolean;
  loginDone: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup extends ILogin {
  confirm_password: string;
  nickname: string;
}

export interface IResponse {
  message: string;
  token: string;
  email: string;
}

export interface ITerms {
  id: number;
  title: string;
  checked: boolean;
}
