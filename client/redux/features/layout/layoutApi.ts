import { apiSlice } from "../api/apiSlice";

// Define the API slice
export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // Edit layout mutation
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "edit-layout",
        method: "PUT",
        credentials: "include" as const,
        body: {
          type,
          image,
          title,
          subTitle,
          faq, // Ensure that FAQ is included if editing
          categories,
        },
      }),
    }),

    // Add layout mutation
    addLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "add-layout",
        method: "POST",
        credentials: "include" as const,
        body: {
          type,
          image,
          title,
          subTitle,
          faq, // Ensure that FAQ is included if adding
          categories,
        },
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
