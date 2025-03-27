import { createAsyncThunk } from "@reduxjs/toolkit";
import $crudAxios from "..";

export const editItemRequest = <T extends object>(name: string, url: string) =>
  createAsyncThunk<T, { uuid: string; data: T }, { rejectValue: string }>(
    `/${name}/EDIT`,
    async ({ uuid, data }, thunkApi) => {
      try {
        const res = await $crudAxios.put(`${url}/${uuid}`, data);
        return res.data as T;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
