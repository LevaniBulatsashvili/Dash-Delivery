import axios from "axios";
import { User } from "../Types";

export const fetchUserData = async (apiKey: string): Promise<User> => {
  try {
    const response = await axios.get(`https://crudapi.co.uk/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
