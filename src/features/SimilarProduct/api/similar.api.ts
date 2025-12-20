import Product from "@/app/store/ProductType";
import { baseApi } from "@/shared";

const similarApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRandomProduct: build.query<Product[], string>({
      query: (category) => ({
        url: `/products/random/${category}`,
      }),
    }),
  }),
});

export const { useGetRandomProductQuery } = similarApi;
