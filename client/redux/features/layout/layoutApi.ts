import { apiSlice } from "../api/apiSlice";

// Define the API slice
export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "edit-layout",
        method: "PUT",
        credentials: "include",
        body: { type, image, title, subTitle, faq, categories },
      }),
    }),

    addLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "create-layout",
        method: "POST",
        credentials: "include",
        body: { type, image, title, subTitle, faq, categories },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetHeroDataQuery,
  useEditLayoutMutation,
  useAddLayoutMutation,
} = layoutApi;
