import { baseApi } from "@/shared";

const addCartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cartToggle: build.mutation<{ message: "string" }, { category: string; SKU: string }>({
      query: ({ category, SKU }) => ({
        method: "POST",
        url: `cart/${category}/${SKU}`,
      }),
      invalidatesTags: (_result, _error) => [{ type: "Cart" }],
    }),
  }),
});

export const { useCartToggleMutation } = addCartApi;
