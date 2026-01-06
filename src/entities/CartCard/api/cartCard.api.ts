import { baseApi } from "@/shared";

export const cartCardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cartStateUpdate: build.mutation<
      { message: string },
      Record<string, { quantity: number; checked: boolean }>
    >({
      query: (newState) => ({
        method: "PATCH",
        url: "cart/update",
        data: newState,
      }),
      invalidatesTags: () => [
        {
          type: "Cart",
        },
      ],
    }),
  }),
});

export const { useCartStateUpdateMutation } = cartCardApi;
