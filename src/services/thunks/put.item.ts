import { createAsyncThunk } from "@reduxjs/toolkit";
import $crudAxios from "..";
import { IWithUuid } from "../../interface/response.interface";

export const putItemRequest = <T extends IWithUuid>(
  name: string,
  url: string
) =>
  createAsyncThunk<T, T, { rejectValue: string }>(
    `/${name}/PUT`,
    async (item, thunkApi) => {
      try {
        const res = await $crudAxios.put(`${url}/${item._uuid}`, item);

        return res.data as T;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
