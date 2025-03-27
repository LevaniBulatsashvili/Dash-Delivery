import { IBaseResponse } from "./response.interface";

export type IWeekDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface IWorkingDay {
  startHours: string;
  endHours: string;
  booked: boolean;
}

export interface IWorkingDays {
  [key: string]: IWorkingDay[];
}

export interface IBaseCourier {
  _uuid: string;
  firstName: string;
  lastName: string;
  pid: number;
  phoneNumber: string;
  email: string;
  password: string;
  profileImage: string;
  role: "admin" | "user" | "courier";
  vehicle: string;
  workingDays: IWorkingDays;
  totalRequests: string[];
}

export interface ICourier extends IBaseResponse, IBaseCourier {}
