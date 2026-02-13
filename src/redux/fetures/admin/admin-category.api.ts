import { baseApi } from "@/redux/api/baseApi";

export const adminCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Category Endpoints ---
    getAllCategories: builder.query<any, void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    getSingleCategory: builder.query<any, string>({
      query: (id) => `/categories/${id}`,
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/categories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // --- Sub-Category Endpoints (WITH PAGINATION) ---
    getAllSubCategories: builder.query<
      any,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/categories/sub-categories",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["SubCategory"],
    }),

    getSingleSubCategory: builder.query<any, string>({
      query: (id) => `/categories/sub-categories/${id}`,
      providesTags: ["SubCategory"],
    }),

    createSubCategory: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("categoryId", data.categoryId);
        formData.append("specFields", JSON.stringify(data.specFields));
        return {
          url: "/categories/sub",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["SubCategory"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, data }) => {
        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        if (data.categoryId) formData.append("categoryId", data.categoryId);
        if (data.specFields)
          formData.append("specFields", JSON.stringify(data.specFields));
        if (data.slug) formData.append("slug", data.slug);

        return {
          url: `/categories/sub/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/sub/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllSubCategoriesQuery,
  useGetSingleSubCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = adminCategoryApi;
