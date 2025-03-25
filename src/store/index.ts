import { combineReducers, configureStore } from "@reduxjs/toolkit";
import courierReducer from "./courier/courier.slice";
import userReducer from "./user/user.slice";
import adminReducer from "./admin/admin.slice";
import loginReducer from "./login/login.slice";

const rootReducer = combineReducers({
  courier: courierReducer,
  user: userReducer,
  admin: adminReducer,
  login: loginReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
