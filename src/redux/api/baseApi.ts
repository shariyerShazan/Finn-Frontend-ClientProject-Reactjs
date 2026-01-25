// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",

    credentials: "include",

    // prepareHeaders: (headers) => {
    //   return headers;
    // },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});
