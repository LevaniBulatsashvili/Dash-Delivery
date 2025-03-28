import { BASE_URL, REQUEST } from "../../apiConfig";
import { IAdmin, IBaseAdmin } from "../../interface/admin.interface";
import { deleteItemRequest } from "../../services/thunks/delete-item";
import { getItemRequest } from "../../services/thunks/get-item";
import { getAllItemRequest } from "../../services/thunks/get-items";
import { postItemRequest } from "../../services/thunks/post-item";
import { putItemRequest } from "../../services/thunks/put.item";

export const getAdminRequest = getItemRequest<IAdmin>(
  "admin",
  `${BASE_URL}/${REQUEST.user}`
);

export const getAdminsRequest = getAllItemRequest<IAdmin>(
  "admins",
  `${BASE_URL}/${REQUEST.user}`
);

export const postAdminRequest = postItemRequest<IAdmin, IBaseAdmin>(
  "admin",
  `${BASE_URL}/${REQUEST.user}`
);

export const editAdminRequest = putItemRequest<IAdmin>(
  "admin",
  `${BASE_URL}/${REQUEST.user}`
);

export const deleteAdminRequest = deleteItemRequest<IAdmin>(
  "admin",
  `${BASE_URL}/${REQUEST.user}`
);
