import { baseApi } from "@/shared";
import type Product from "@/app/store/ProductType";
import { store } from "@/app/store/store";
import { cartRestore } from "../model/cart.slice";

type CartProductData = Omit<Product, "comments" | "rating"> & {
  quantity: number;
  checked: boolean;
};

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getCart: build.query<CartProductData[], void>({
      query: () => ({
        method: "GET",
        url: "/cart",
      }),
      providesTags: (_result, _error) => [
        {
          type: "Cart",
        },
      ],
      transformResponse: (baseQueryReturnValue: CartProductData[]) => {
        store.dispatch(cartRestore(baseQueryReturnValue));
        return baseQueryReturnValue;
      },
    }),
  }),
});

export const { useGetCartQuery } = cartApi;
