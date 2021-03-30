export interface terms {
  id: number;
  title: string;
  checked: boolean;
}

export interface singUpData {
  email: string;
  paswword: string;
  confirm_password: string;
  nickname: string;
}

export interface logInData {
  email: string;
  password: string;
}
