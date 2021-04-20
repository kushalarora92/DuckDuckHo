export interface IUser {
  _id: number;
  email: string;
  active: Boolean;
  token?: string;
}