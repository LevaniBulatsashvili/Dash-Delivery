import { BASE_URL, REQUEST } from "../../apiConfig";
import { IBaseCourier, ICourier } from "../../interface/courier.interface";
import { deleteItemRequest } from "../../services/thunks/delete-item";
import { getItemRequest } from "../../services/thunks/get-item";
import { getAllItemRequest } from "../../services/thunks/get-items";
import { postItemRequest } from "../../services/thunks/post-item";
import { putItemRequest } from "../../services/thunks/put.item";

export const getCourierRequest = getItemRequest<ICourier>(
  "courier",
  `${BASE_URL}/${REQUEST.user}`
);

export const getCouriersRequest = getAllItemRequest<ICourier>(
  "couriers",
  `${BASE_URL}/${REQUEST.user}`
);

export const postCourierRequest = postItemRequest<ICourier, IBaseCourier>(
  "courier",
  `${BASE_URL}/${REQUEST.user}`
);

export const editCourierRequest = putItemRequest<ICourier>(
  "courier",
  `${BASE_URL}/${REQUEST.user}`
);

export const deleteCourierRequest = deleteItemRequest<ICourier>(
  "courier",
  `${BASE_URL}/${REQUEST.user}`
);
