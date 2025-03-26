import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { RootState, AppDispatch } from "../index";
import { loginStart, loginSuccess, loginFailure } from "./login.slice";
import { IUser } from "../../interface/user.interface";
import { IAdmin } from "../../interface/admin.interface";
import { ICourier } from "../../interface/courier.interface";

const LOGIN_API_URL = import.meta.env.VITE_API_URL;

interface LoginResponse {
    items: Array<{
        user?: IUser;
        admin?: IAdmin;
        courier?: ICourier;
        role: "admin" | "user" | "courier";
        _uuid: string;
        email: string;
        password: string;
    }>;
}

export const loginUser = (
    email: string,
    password: string
): ThunkAction<Promise<void>, RootState, undefined, ReturnType<typeof loginStart> | ReturnType<typeof loginSuccess> | ReturnType<typeof loginFailure>> => async (dispatch: AppDispatch) => {
    dispatch(loginStart());

    try {
        const response = await axios.get<LoginResponse>(`${LOGIN_API_URL}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        });

        if (!response.data || !response.data.items) {
            dispatch(loginFailure("No users found in the response"));
            return;
        }

        const userData = response.data.items.find((item) => item.email === email && item.password === password);

        if (!userData) {
            dispatch(loginFailure("Invalid credentials"));
            return;
        }

        const { _uuid, user, admin, courier, role } = userData;

        if (!_uuid) {
            dispatch(loginFailure("User UUID is missing"));
            return;
        }

        localStorage.setItem("user", JSON.stringify(userData));
        
        dispatch(loginSuccess({ user, admin, courier, role }));

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Invalid credentials or server error";
        dispatch(loginFailure(errorMessage));
    }
};
