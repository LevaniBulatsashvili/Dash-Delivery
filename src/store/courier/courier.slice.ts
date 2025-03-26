import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteCourierRequest,
  editCourierRequest,
  getCourierRequest,
  getCouriersRequest,
  postCourierRequest,
} from "./courier.thunks";
import { ICourier } from "../../interface/courier.interface";
import { RootState } from "../";

interface ICourierState {
  courierList: ICourier[];
  courier: ICourier;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ICourierState = {
  courierList: [],
  courier: {} as ICourier,
  loading: false,
  error: null,
};

const courierSlice = createSlice({
  name: "courier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourierRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCourierRequest.fulfilled,
        (state, { payload: courier }: PayloadAction<ICourier>) => {
          state.loading = false;
          state.error = null;
          state.courier = courier;
        }
      )
      .addCase(
        getCourierRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(getCouriersRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCouriersRequest.fulfilled,
        (state, { payload: allUsers }: PayloadAction<ICourier[]>) => {
          state.loading = false;
          state.error = null;
          state.courierList = allUsers.filter(
            (user) => user.role === "courier"
          );
        }
      )
      .addCase(
        getCouriersRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(postCourierRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postCourierRequest.fulfilled,
        (state, { payload: courier }: PayloadAction<ICourier>) => {
          state.loading = false;
          state.error = null;
          state.courierList = [courier, ...state.courierList];
        }
      )
      .addCase(
        postCourierRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(editCourierRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        editCourierRequest.fulfilled,
        (state, { payload: updatedCourier }: PayloadAction<ICourier>) => {
          state.loading = false;
          state.error = null;
          state.courierList = state.courierList.map((courier) => {
            if (courier._uuid !== updatedCourier._uuid) return courier;
            return updatedCourier;
          });
          state.courier = updatedCourier;
        }
      )
      .addCase(
        editCourierRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(deleteCourierRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteCourierRequest.fulfilled,
        (state, { payload: deletedCourier }: PayloadAction<ICourier>) => {
          state.loading = false;
          state.error = null;
          state.courierList = state.courierList.filter(
            (courier) => courier._uuid !== deletedCourier._uuid
          );
        }
      )
      .addCase(
        deleteCourierRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );
  },
});

export const courierSelector = (state: RootState) => state.courier;
export default courierSlice.reducer;
