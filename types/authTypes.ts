export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
