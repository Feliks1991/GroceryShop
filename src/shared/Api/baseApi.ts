import { axiosBaseQuery } from "@/app/api/Fetch";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Comments", "Favorite", "Cart"],
  endpoints: () => ({}),
});
