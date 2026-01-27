// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777", // Adjust the prefix (e.g., /api/v1) based on your NestJS global prefix
    credentials: "include", // Required for cookies/sessions
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});