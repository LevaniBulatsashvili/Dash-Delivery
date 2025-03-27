import { createAsyncThunk } from "@reduxjs/toolkit";
import $crudAxios from "..";
import { IGetAllResponse } from "../../interface/response.interface"; 

export const getAllItemRequest = <T extends object>(
  name: string,
  url: string
) =>
  createAsyncThunk<T[], void, { rejectValue: string }>(
    `/${name}/GET`,
    async (_, thunkApi) => {
      try {
        const res = await $crudAxios.get(`${url}`);
        const data: IGetAllResponse<T> = res.data;

        return data.items;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
