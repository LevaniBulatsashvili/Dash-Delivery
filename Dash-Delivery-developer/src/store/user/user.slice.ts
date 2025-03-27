import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRandomUser, IUser } from "../../interface/user.interface";
import { RootState } from "../";
import {
  deleteUserRequest,
  editUserRequest,
  getUserRequest,
  getUsersRequest,
  postUserRequest,
} from "./user.thunk";

const loadUserFromLocalStorage = (): IRandomUser | null => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
};

interface IUserState {
  userList: IRandomUser[];
  user: IRandomUser;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IUserState = {
  userList: [],
  user: loadUserFromLocalStorage() || ({} as IRandomUser),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = {} as IUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUserRequest.fulfilled,
        (state, { payload: user }: PayloadAction<IRandomUser>) => {
          state.loading = false;
          state.error = null;
          state.user = user;
        }
      )
      .addCase(
        getUserRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(getUsersRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUsersRequest.fulfilled,
        (state, { payload: users }: PayloadAction<IRandomUser[]>) => {
          state.loading = false;
          state.error = null;
          state.userList = users;
        }
      )
      .addCase(
        getUsersRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(postUserRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postUserRequest.fulfilled,
        (state, { payload: user }: PayloadAction<IRandomUser>) => {
          state.loading = false;
          state.error = null;
          state.userList = [user, ...state.userList];
          state.user = user;
        }
      )
      .addCase(
        postUserRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(editUserRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        editUserRequest.fulfilled,
        (state, { payload: updatedUser }: PayloadAction<IRandomUser>) => {
          state.loading = false;
          state.error = null;
          state.userList = state.userList.map((user) => {
            if (user._uuid !== updatedUser._uuid) return user;
            return updatedUser;
          });
          if (state.user._uuid === updatedUser._uuid) state.user = updatedUser;
        }
      )
      .addCase(
        editUserRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(deleteUserRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteUserRequest.fulfilled,
        (state, { payload: deletedUser }: PayloadAction<IRandomUser>) => {
          state.loading = false;
          state.error = null;
          state.userList = state.userList.filter(
            (user) => user._uuid !== deletedUser._uuid
          );
        }
      )
      .addCase(
        deleteUserRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );
  },
});

export const { logout } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
