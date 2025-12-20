import { baseApi } from "@/shared/Api/baseApi";

const likeSelectorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    favoriteToggle: build.mutation<{ message: string }, { category: string; SKU: string }>({
      query: ({ category, SKU }) => ({
        method: "POST",
        url: `products/favorites/${category}/${SKU}`,
      }),
      invalidatesTags: (_result, _error) => [{ type: "Favorite" }],
    }),
  }),
});

export const { useFavoriteToggleMutation } = likeSelectorApi;
