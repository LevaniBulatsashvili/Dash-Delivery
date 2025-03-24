import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY as string;

const $crudAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default $crudAxios;
