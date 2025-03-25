import { IBaseResponse } from "./response.interface";

type IWeekDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface IWorkingDay {
  day: IWeekDays;
  startHours: string;
  endHours: string;
  booked: boolean;
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
  workingDays: [
    IWorkingDay,
    IWorkingDay,
    IWorkingDay,
    IWorkingDay,
    IWorkingDay,
    ...IWorkingDay[]
  ];
  totalRequests: string[];
}

export interface ICourier extends IBaseResponse, IBaseCourier {}
