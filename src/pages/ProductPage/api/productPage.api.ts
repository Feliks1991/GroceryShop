import { baseApi } from "@/shared";
import type Product from "@/app/store/ProductType";

const productPageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<Product, { category: string; SKU: string }>({
      query: ({ category, SKU }) => ({
        url: `products/${category}/${SKU}`,
      }),
    }),
  }),
});

export const { useGetProductQuery } = productPageApi;
