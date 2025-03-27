import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdmin } from "../../interface/admin.interface";
import { RootState } from "../";
import {
  deleteAdminRequest,
  editAdminRequest,
  getAdminRequest,
  getAdminsRequest,
  postAdminRequest,
} from "./admin.thunk";

interface IAdminState {
  adminList: IAdmin[];
  admin: IAdmin;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IAdminState = {
  adminList: [],
  admin: {} as IAdmin,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAdminRequest.fulfilled,
        (state, { payload: admin }: PayloadAction<IAdmin>) => {
          state.loading = false;
          state.error = null;
          state.admin = admin;
        }
      )
      .addCase(
        getAdminRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(getAdminsRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAdminsRequest.fulfilled,
        (state, { payload: admins }: PayloadAction<IAdmin[]>) => {
          state.loading = false;
          state.error = null;
          state.adminList = admins;
        }
      )
      .addCase(
        getAdminsRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(postAdminRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postAdminRequest.fulfilled,
        (state, { payload: admin }: PayloadAction<IAdmin>) => {
          state.loading = false;
          state.error = null;
          state.adminList = [admin, ...state.adminList];
        }
      )
      .addCase(
        postAdminRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(editAdminRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        editAdminRequest.fulfilled,
        (state, { payload: updatedAdmin }: PayloadAction<IAdmin>) => {
          state.loading = false;
          state.error = null;
          state.adminList = state.adminList.map((admin) => {
            if (admin._uuid !== updatedAdmin._uuid) return admin;
            return updatedAdmin;
          });
        }
      )
      .addCase(
        editAdminRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(deleteAdminRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteAdminRequest.fulfilled,
        (state, { payload: deletedAdmin }: PayloadAction<IAdmin>) => {
          state.loading = false;
          state.error = null;
          state.adminList = state.adminList.filter(
            (admin) => admin._uuid !== deletedAdmin._uuid
          );
        }
      )
      .addCase(
        deleteAdminRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );
  },
});

export const adminSelector = (state: RootState) => state.admin;
export default adminSlice.reducer;
