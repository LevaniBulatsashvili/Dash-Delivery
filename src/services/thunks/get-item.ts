import { createAsyncThunk } from "@reduxjs/toolkit";

import $crudAxios from "..";

export const getItemRequest = <T extends object>(name: string, url: string) =>
  createAsyncThunk<T, string, { rejectValue: string }>(
    `/${name}/GET`,
    async (uuid, thunkApi) => {
      try {
        const res = await $crudAxios.get(`${url}/${uuid}`);

        return res.data as T;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
