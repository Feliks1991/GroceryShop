import { baseApi } from "@/shared";

const cartCardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    quantity: build.mutation<
      { message: string },
      Record<string, { quantity: number; checked: boolean }>
    >({
      query: (qtyData) => ({
        method: "PATCH",
        url: "cart/quantity",
        data: qtyData,
      }),
      invalidatesTags: (_result, _error) => [
        {
          type: "Cart",
        },
      ],
    }),
  }),
});

export const { useQuantityMutation } = cartCardApi;
