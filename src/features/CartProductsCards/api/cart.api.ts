import { baseApi } from "@/shared";
import type Product from "@/app/store/ProductType";
import { type AppState } from "@/app/store/reduxTypes";

type CartProductData = Omit<Product, "comments" | "rating"> & {
  quantity: number;
  checked: boolean;
};

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getCart: build.query<CartProductData[], void>({
      query: () => ({
        method: "GET",
        url: "/cart",
      }),
      providesTags: () => [{ type: "Cart" }],
    }),

    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    deleteSelectedItems: build.mutation<{ message: string }, void>({
      query: () => ({
        method: "DELETE",
        url: `/cart/delete`,
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      onQueryStarted: async (__, { dispatch, getState, queryFulfilled }) => {
        const state = getState() as AppState;
        const checkedSkus = Object.entries(state.cartSlice)
          .filter(([, item]) => item.checked)
          .map(([sku]) => sku);

        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            return draft.filter((item) => !checkedSkus.includes(item.SKU));
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: () => [{ type: "Cart" }],
    }),
  }),
});

export const { useGetCartQuery, useDeleteSelectedItemsMutation } = cartApi;
