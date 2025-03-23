import { BASE_URL, REQUEST } from "../../apiConfig";
import { IBaseUser, IUser } from "../../interface/user.interface";
import { deleteItemRequest } from "../../services/thunks/delete-item";
import { getItemRequest } from "../../services/thunks/get-item";
import { getAllItemRequest } from "../../services/thunks/get-items";
import { postItemRequest } from "../../services/thunks/post-item";
import { putItemRequest } from "../../services/thunks/put.item";

export const getUserRequest = getItemRequest<IUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);

export const getUsersRequest = getAllItemRequest<IUser>(
  "users",
  `${BASE_URL}/${REQUEST.user}`
);

export const postUserRequest = postItemRequest<IUser, IBaseUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);

export const editUserRequest = putItemRequest<IUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);

export const deleteUserRequest = deleteItemRequest<IUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);
