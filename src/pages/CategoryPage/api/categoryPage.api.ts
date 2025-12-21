import { baseApi } from "@/shared";
import type Product from "@/app/store/ProductType";

const categoryPageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getFavoritedProducts: build.query<{ favorites: Product[]; skus: string[] }, void>({
      query: () => ({
        url: `products/favorites`,
      }),
      transformResponse: (response: Product[]) => ({
        favorites: response,
        skus: response.map((product) => product.SKU),
      }),
      providesTags: (_result, _error) => [{ type: "Favorite" }],
    }),
  }),
});

export const { useGetFavoritedProductsQuery } = categoryPageApi;
