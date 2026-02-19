/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- GET CURRENT USER DETAILS ---
    getMe: builder.query<any, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),



    // --- CREATE SELLER PROFILE ---
    createSellerProfile: builder.mutation({
      query: (data) => ({
        url: "/user/create-seller-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // --- UPDATE PROFILE (USER/SELLER) ---
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // --- GET SELLER'S OWN ADS ---
    getMyAds: builder.query({
      query: (params) => ({
        url: "/user/my-ads",
        method: "GET",
        params: params, // page, limit, search eikhane jabe
      }),
      providesTags: ["Ads"],
    }),

    // --- GET SINGLE AD (SELLER) ---
    getSingleMyAd: builder.query({
      query: (adId) => ({
        url: `/user/my-ads/${adId}`,
        method: "GET",
      }),
    }),

    // --- GET SELLER EARNINGS ---
    getMyEarnings: builder.query({
      query: (params) => ({
        url: "/user/my-earnings",
        method: "GET",
        params: params,
      }),
    }),

    // --- GET BUYER PURCHASES ---
    getMyPurchases: builder.query({
      query: (params) => ({
        url: "/user/my-purchases",
        method: "GET",
        params: params,
      }),
    }),

    // --- GET SINGLE PAYMENT DETAILS ---
    getSinglePayment: builder.query({
      query: (paymentId) => ({
        url: `/user/payment/${paymentId}`,
        method: "GET",
      }),
    }),

    getSellerStats: builder.query<any, void>({
      query: () => ({
        url: "/user/seller-stats",
        method: "GET",
      }),
      providesTags: ["Ads", "User"],
    }),

    getSellerRecentAds: builder.query<any, { search?: string }>({
      query: (params) => ({
        url: "/user/seller-recent-ads",
        method: "GET",
        params: params,
      }),
      providesTags: ["Ads"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useCreateSellerProfileMutation,
  useUpdateProfileMutation,
  useGetMyAdsQuery,
  useGetSingleMyAdQuery,
  useGetMyEarningsQuery,
  useGetMyPurchasesQuery,
  useGetSellerStatsQuery,
  useGetSellerRecentAdsQuery,
  useGetSinglePaymentQuery,
} = userApi;
