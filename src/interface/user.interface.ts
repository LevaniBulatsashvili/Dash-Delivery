import { IAdmin } from "./admin.interface";
import { ICourier } from "./courier.interface";
import { IBaseResponse } from "./response.interface";

interface IAdress {
  lng: number;
  lat: number;
}

export interface IBaseUser {
  _uuid: string;
  firstName: string;
  lastName: string;
  pid: number;
  phoneNumber: string;
  email: string;
  password: string;
  profileImage: string;
  role: "admin" | "user" | "courier";
  address: IAdress;
}

export interface IUser extends IBaseResponse, IBaseUser {}
export type IRandomUser = IUser | IAdmin | ICourier;
