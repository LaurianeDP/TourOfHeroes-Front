
export interface User {
  username: string;
  password: string;
  authenticatedStatus?:boolean;
}

export interface Token {
  token: string;
}
