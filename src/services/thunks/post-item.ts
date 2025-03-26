import { createAsyncThunk } from "@reduxjs/toolkit";
import $crudAxios from "..";
import { IGetAllResponse } from "../../interface/response.interface";

export const postItemRequest = <T extends object, U extends object>(
  name: string,
  url: string
) =>
  createAsyncThunk<T, U, { rejectValue: string }>(
    `/${name}/POST`,
    async (item, thunkApi) => {
      try {
        const res = await $crudAxios.post(`${url}`, [item]);
        const data: IGetAllResponse<T> = res.data;

        return data.items[0];
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
