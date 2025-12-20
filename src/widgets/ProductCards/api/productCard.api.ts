import { baseApi } from "@/shared";
import type Product from "@/app/store/ProductType";

const productCardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductsByCategory: build.query<Product[], string>({
      query: (category) => ({ url: `/products/${category}` }),
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productCardApi;
