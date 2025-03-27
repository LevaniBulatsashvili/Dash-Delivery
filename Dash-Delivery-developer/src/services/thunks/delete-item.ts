import { createAsyncThunk } from "@reduxjs/toolkit";
import $crudAxios from "..";

export const deleteItemRequest = <T extends object>(
  name: string,
  url: string
) =>
  createAsyncThunk<T, string, { rejectValue: string }>(
    `/${name}/DELETE`,
    async (uuid, thunkApi) => {
      try {
        const res = await $crudAxios.delete(`${url}/${uuid}`);

        return res.data as T;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );

export const editItemRequest = <T extends object>(name: string, url: string) =>
  createAsyncThunk<T, { uuid: string; data: T }, { rejectValue: string }>(
    `/${name}/EDIT`,
    async ({ uuid, data }, thunkApi) => {
      try {
        const res = await $crudAxios.put(`${url}/${uuid}`, data); // PUT მეთოდი განახლებისთვის
        return res.data as T;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
