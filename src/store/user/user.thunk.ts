import { BASE_URL, REQUEST } from "../../apiConfig";
import { IRandomUser } from "../../interface/user.interface";
import { deleteItemRequest } from "../../services/thunks/delete-item";
import { getItemRequest } from "../../services/thunks/get-item";
import { getAllItemRequest } from "../../services/thunks/get-items";
import { postItemRequest } from "../../services/thunks/post-item";
import { putItemRequest } from "../../services/thunks/put.item";

export const getUserRequest = getItemRequest<IRandomUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);

export const getUsersRequest = getAllItemRequest<IRandomUser>(
  "users",
  `${BASE_URL}/${REQUEST.user}`
);

export const postUserRequest = postItemRequest<IRandomUser, IRandomUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);

export const editUserRequest = putItemRequest<IRandomUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);

export const deleteUserRequest = deleteItemRequest<IRandomUser>(
  "user",
  `${BASE_URL}/${REQUEST.user}`
);
