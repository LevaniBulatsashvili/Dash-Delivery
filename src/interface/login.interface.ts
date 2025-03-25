import { IAdmin } from "./admin.interface";
import { ICourier } from "./courier.interface";
import { IUser } from "./user.interface";

export interface ILoginState {
    user: IUser | null;
    courier: ICourier | null;
    admin: IAdmin | null;
    loading: boolean;
    error: string | null;
  }