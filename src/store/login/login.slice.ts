import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface/user.interface";
import { IAdmin } from "../../interface/admin.interface";
import { ICourier } from "../../interface/courier.interface";

interface LoginState {
    user: IUser | null;
    admin: IAdmin | null;
    courier: ICourier | null;
    role: "admin" | "user" | "courier" | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: LoginState = {
    user: null,
    admin: null,
    courier: null,
    role: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (
            state,
            action: PayloadAction<{
                user?: IUser;
                admin?: IAdmin;
                courier?: ICourier;
                role: "admin" | "user" | "courier";
            }>
        ) => {
            const { user, admin, courier, role } = action.payload;
            state.loading = false;
            state.error = null;
            state.user = user ?? null;
            state.admin = admin ?? null;
            state.courier = courier ?? null;
            state.role = role;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.user = null;
            state.admin = null;
            state.courier = null;
            state.role = null;
            state.isAuthenticated = false;
          },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;
