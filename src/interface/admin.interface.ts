import { IBaseResponse } from "./response.interface";

export interface IBaseAdmin {
  _uuid: string;
  firstName: string;
  lastName: string;
  pid: number;
  phoneNumber: string;
  email: string;
  password: string;
  profileImage: string;
  role: "admin" | "user" | "courier";
}

export interface IAdmin extends IBaseResponse, IBaseAdmin {}
